"use client";

import { useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface Snake {
  body: Position[];
  direction: { x: number; y: number };
  food: Position;
  speed: number;
  initialSpeed: number;
  moveCount: number;
  directionIndex: number;
  colors: {
    head: string;
    body1: string;
    body2: string;
  };
}

const CELL_SIZE = 20;
const INITIAL_SPEED_MAIN = 120;
const INITIAL_SPEED_SLOW = 200; // Slower for additional snakes

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const gameLoopRefs = useRef<{ [key: number]: ReturnType<typeof setTimeout> | null }>({});
  const snakesRef = useRef<Snake[]>([]);

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        const isMobile = window.innerWidth < 768;
        const width = isMobile ? window.innerWidth : Math.min(window.innerWidth, 1400);
        const height = isMobile 
          ? Math.min(window.innerHeight * 0.5, 400) 
          : Math.min(window.innerHeight * 0.7, 700);
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const cols = Math.floor(dimensions.width / CELL_SIZE);
    const rows = Math.floor(dimensions.height / CELL_SIZE);

    // Initialize 3 snakes with different colors and speeds
    const centerX = Math.floor(cols / 2);
    const centerY = Math.floor(rows / 2);
    
    snakesRef.current = [
      // Main snake - darker orange, faster
      {
        body: [
          { x: centerX, y: centerY },
          { x: centerX - 1, y: centerY },
          { x: centerX - 2, y: centerY },
        ],
        direction: { x: 1, y: 0 },
        food: {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        },
        speed: INITIAL_SPEED_MAIN,
        initialSpeed: INITIAL_SPEED_MAIN,
        moveCount: 0,
        directionIndex: 0,
        colors: {
          head: "#f55e1d",
          body1: "#f7cbb7",
          body2: "#f5956c",
        },
      },
      // Second snake - lighter orange, slower
      {
        body: [
          { x: Math.floor(cols * 0.3), y: Math.floor(rows * 0.3) },
          { x: Math.floor(cols * 0.3) - 1, y: Math.floor(rows * 0.3) },
          { x: Math.floor(cols * 0.3) - 2, y: Math.floor(rows * 0.3) },
        ],
        direction: { x: 0, y: 1 },
        food: {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        },
        speed: INITIAL_SPEED_SLOW,
        initialSpeed: INITIAL_SPEED_SLOW,
        moveCount: 0,
        directionIndex: 0,
        colors: {
          head: "#f98831",
          body1: "#ffd5b3",
          body2: "#ffe6cc",
        },
      },
      // Third snake - even lighter, slower
      {
        body: [
          { x: Math.floor(cols * 0.7), y: Math.floor(rows * 0.7) },
          { x: Math.floor(cols * 0.7) - 1, y: Math.floor(rows * 0.7) },
          { x: Math.floor(cols * 0.7) - 2, y: Math.floor(rows * 0.7) },
        ],
        direction: { x: -1, y: 0 },
        food: {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        },
        speed: INITIAL_SPEED_SLOW + 30,
        initialSpeed: INITIAL_SPEED_SLOW + 30,
        moveCount: 0,
        directionIndex: 0,
        colors: {
          head: "#f95c40",
          body1: "#f98975",
          body2: "#fff0e0",
        },
      },
    ];

    const directions = [
      { x: 1, y: 0 }, // Right
      { x: 0, y: 1 }, // Down
      { x: -1, y: 0 }, // Left
      { x: 0, y: -1 }, // Up
    ];
    const movesPerDirection = 10;

    const updateSnake = (snake: Snake, snakeIndex: number) => {
      snake.moveCount++;
      const head = snake.body[0];
      const dx = snake.food.x - head.x;
      const dy = snake.food.y - head.y;

      // Auto-direction change with pathfinding
      if (snake.moveCount >= movesPerDirection || Math.abs(dx) + Math.abs(dy) < 5) {
        snake.moveCount = 0;
        const possibleDirections = directions.filter((dir) => {
          const newX = head.x + dir.x;
          const newY = head.y + dir.y;
          const wrappedX = newX < 0 ? cols - 1 : newX >= cols ? 0 : newX;
          const wrappedY = newY < 0 ? rows - 1 : newY >= rows ? 0 : newY;
          
          // Check collision with all snakes
          return !snakesRef.current.some((s) =>
            s.body.slice(0, -1).some((seg) => seg.x === wrappedX && seg.y === wrappedY)
          );
        });

        if (possibleDirections.length > 0) {
          possibleDirections.sort((a, b) => {
            const newX1 = head.x + a.x;
            const newY1 = head.y + a.y;
            const newX2 = head.x + b.x;
            const newY2 = head.y + b.y;
            const dist1 = Math.abs(newX1 - snake.food.x) + Math.abs(newY1 - snake.food.y);
            const dist2 = Math.abs(newX2 - snake.food.x) + Math.abs(newY2 - snake.food.y);
            return dist1 - dist2;
          });

          if (Math.random() > 0.3 && possibleDirections.length > 1) {
            snake.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
          } else {
            snake.direction = possibleDirections[0];
          }
        } else {
          snake.directionIndex = (snake.directionIndex + 1) % directions.length;
          snake.direction = directions[snake.directionIndex];
        }
      }

      // Move snake
      const newHead = {
        x: snake.body[0].x + snake.direction.x,
        y: snake.body[0].y + snake.direction.y,
      };

      // Wrap around
      if (newHead.x < 0) newHead.x = cols - 1;
      if (newHead.x >= cols) newHead.x = 0;
      if (newHead.y < 0) newHead.y = rows - 1;
      if (newHead.y >= rows) newHead.y = 0;

      // Check food collision
      if (newHead.x === snake.food.x && newHead.y === snake.food.y) {
        snake.body.unshift(newHead);
        let newFood: Position;
        do {
          newFood = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows),
          };
        } while (
          snakesRef.current.some((s) =>
            s.body.some((seg) => seg.x === newFood.x && seg.y === newFood.y)
          )
        );
        snake.food = newFood;
        snake.speed = Math.max(snake.initialSpeed - 20, snake.initialSpeed - 40);
      } else {
        snake.body.unshift(newHead);
        snake.body.pop();
      }

      // Reset if too long
      if (snake.body.length > 20) {
        snake.body = snake.body.slice(0, Math.floor(snake.body.length / 2));
        snake.food = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        };
        snake.speed = snake.initialSpeed;
      }
    };

    const drawSnake = (snake: Snake, snakeIndex: number) => {
      if (!ctx) return;

      // Determine if this is a lighter snake (index 1 or 2)
      const isLightSnake = snakeIndex > 0;
      const baseAlpha = isLightSnake ? 0.5 : 1.0; // Reduce opacity for lighter snakes

      // Draw food
      ctx.fillStyle = snake.colors.head;
      ctx.shadowColor = snake.colors.head;
      ctx.shadowBlur = isLightSnake ? 4 : 6;
      ctx.globalAlpha = baseAlpha * 0.8;
      ctx.fillRect(
        snake.food.x * CELL_SIZE + 3,
        snake.food.y * CELL_SIZE + 3,
        CELL_SIZE - 6,
        CELL_SIZE - 6
      );
      ctx.shadowBlur = 0;

      // Draw snake body
      snake.body.forEach((segment, index) => {
        const isHead = index === 0;
        const alpha = isHead 
          ? (isLightSnake ? 0.5 : 0.6) 
          : Math.max(0.1, (isLightSnake ? 0.3 : 0.4) - index * 0.02);
        const color = isHead
          ? snake.colors.head
          : index < 3
          ? snake.colors.body1
          : snake.colors.body2;

        ctx.fillStyle = color;
        ctx.globalAlpha = alpha * baseAlpha;

        const padding = isHead ? 2 : 3;
        ctx.fillRect(
          segment.x * CELL_SIZE + padding,
          segment.y * CELL_SIZE + padding,
          CELL_SIZE - padding * 2,
          CELL_SIZE - padding * 2
        );

        if (isHead) {
          ctx.strokeStyle = snake.colors.body1;
          ctx.globalAlpha = (isLightSnake ? 0.3 : 0.4) * baseAlpha;
          ctx.lineWidth = 1;
          ctx.strokeRect(
            segment.x * CELL_SIZE + padding,
            segment.y * CELL_SIZE + padding,
            CELL_SIZE - padding * 2,
            CELL_SIZE - padding * 2
          );
        }
      });
      ctx.globalAlpha = 1;
    };

    // Individual snake update loops
    const createSnakeLoop = (snakeIndex: number) => {
      const snake = snakesRef.current[snakeIndex];
      if (!snake) return;

      updateSnake(snake, snakeIndex);

      // Schedule next update for this snake
      gameLoopRefs.current[snakeIndex] = setTimeout(
        () => createSnakeLoop(snakeIndex),
        snake.speed
      );
    };

    // Main render loop - draws all snakes
    const renderLoop = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw all snakes
      snakesRef.current.forEach((snake, index) => {
        drawSnake(snake, index);
      });

      // Continue rendering at 60fps
      requestAnimationFrame(renderLoop);
    };

    // Start all snake update loops
    snakesRef.current.forEach((_, index) => {
      createSnakeLoop(index);
    });

    // Start render loop
    renderLoop();

    return () => {
      Object.values(gameLoopRefs.current).forEach((timeout) => {
        if (timeout) clearTimeout(timeout);
      });
      gameLoopRefs.current = {};
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-35 pointer-events-none max-[768px]:opacity-25"
      style={{ 
        imageRendering: "pixelated"
      }}
    />
  );
}

