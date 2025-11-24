"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./homePageTestimonialsVideo.module.css";

export default function HomePageTestimonialsVideo() {
  const videos = [
    {
      videoUrl: "https://www.youtube.com/embed/p41OvikonKo",
      name: "Anjali Shah",
      company: "Skyworks Solutions, Inc.",
      linkedinUrl: "https://www.linkedin.com/in/anjalishah6198/",
      profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/Website/website%20thumbnails-19.jpg",
    },
    {
      videoUrl: "https://www.youtube.com/embed/nYEO8K0q38c",
      name: "Rijul Jain",
      company: "Wise",
      linkedinUrl: "https://www.linkedin.com/in/-rijuljain-/",
      profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/Website/website%20thumbnails-20.jpg",
    },
    {
      videoUrl: "https://www.youtube.com/embed/p9kzhLHjJuI",
      name: "Aryan Gupta",
      company: "IBM",
      linkedinUrl: "#",
      profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/Website/website%20thumbnails-18.jpg",
    },
  ];

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handlePlay = (index: number) => {
    // Close all other videos
    setPlayingIndex(index);
  };

  return (
    <section className={styles.testimonialsVideoSection}>
      <div className={styles.videoContainer}>
        <div className={styles.videoRow}>
          {videos.map((video, index) => (
            <div key={index} className={styles.videoCard}>
              <div className={styles.videoWrapper}>
                {/* YouTube Video Embed - Show when playing */}
                {playingIndex === index && (
                  <>
                    <iframe
                      id={`userVideo-${index}`}
                      src={`${video.videoUrl}?autoplay=1&rel=0`}
                      className={styles.videoIframe}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    />
                    {/* Close Button */}
                    <button
                      onClick={() => setPlayingIndex(null)}
                      className={styles.closeButton}
                      aria-label="Close video"
                    >
                      ✕
                    </button>
                  </>
                )}

                {/* Thumbnail Image Overlay - Show when video is not playing */}
                {playingIndex !== index && (
                  <>
                    <Image
                      src={video.profileImage}
                      alt={`${video.name} - Click to play video`}
                      fill
                      className={styles.thumbnailImage}
                      onClick={() => handlePlay(index)}
                      unoptimized
                    />
                    {/* Play Button Overlay */}
                    <div
                      className={styles.playButton}
                      onClick={() => handlePlay(index)}
                    >
                      ▶
                    </div>
                  </>
                )}

                {/* User Info - Always visible, overlaid on video */}
                <div className={styles.userInfo}>
                  <div className={styles.userInfoContent}>
                    <div className={styles.profileImageWrapper}>
                      <Image
                        src={video.profileImage}
                        alt={video.name}
                        width={40}
                        height={40}
                        className={styles.profileImage}
                        unoptimized
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                    <div className={styles.userDetails}>
                      <p className={styles.userName}>{video.name}</p>
                      <p className={styles.userCompany}>{video.company}</p>
                    </div>
                    <a
                      href={video.linkedinUrl !== "#" ? video.linkedinUrl : "#"}
                      target={video.linkedinUrl !== "#" ? "_blank" : undefined}
                      rel={
                        video.linkedinUrl !== "#"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={`${styles.linkedinButton} ${
                        video.linkedinUrl !== "#"
                          ? styles.linkedinButtonActive
                          : styles.linkedinButtonDisabled
                      }`}
                      aria-label="LinkedIn Profile"
                      onClick={(e) => {
                        if (video.linkedinUrl === "#") {
                          e.preventDefault();
                        }
                      }}
                    >
                      <svg
                        className={styles.linkedinIcon}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

