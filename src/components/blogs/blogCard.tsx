"use client";

import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import { BsCalendarEvent } from "react-icons/bs";
import Link from "next/link";

type Blog = {
  id: number;
  slug?: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  categoryColor?: string;
};

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <section className="border border-gray-200 rounded-[0.1rem] p-[0.3rem] bg-white transition-all duration-300 hover:-translate-y-[0.3rem] hover:shadow-[0_0.4rem_0.8rem_rgba(0,0,0,0.08)]">
      <Link
        href={`/blog/${blog.slug}`}
        target="_blank"
        className="block bg-white border border-gray-200 rounded-[0.1rem] overflow-hidden shadow-[0_0.2rem_0.5rem_rgba(0,0,0,0.05)] text-left transition-all duration-300 cursor-pointer max-[768px]:max-w-full"
      >
        {/* === Image === */}
        <div className="w-full aspect-video overflow-hidden relative bg-[#f9f9f9] max-[768px]:aspect-[16/10]">
          <Image
            src={blog.image}
            alt={blog.title}
            width={400}
            height={250}
            className="w-full h-full object-cover transition-transform duration-300 block"
          />
        </div>

        {/* === Content === */}
        <div className="px-6 pt-6 pb-2">
          <p className="text-[0.9rem] font-bold text-[#f78b5d] uppercase mb-2 bg-transparent">
            {blog.category.toUpperCase()}
          </p>

          <h3 className="text-[1.2rem] font-bold text-[#111] mb-2.5 leading-[1.4] line-clamp-2">{blog.title}</h3>

          {/* Author */}
          <p className="text-[0.9rem] text-[#666] mb-2">
            By <span className="font-semibold text-[#111]">Rachna Goyal</span>
          </p>

          <p className="text-base text-[#555] mb-1 leading-[1.4] line-clamp-3">{blog.excerpt}</p>

          <div className="flex flex-row gap-5 text-[0.95rem] text-[#777] font-medium">
            <span>
              <div className="flex flex-row items-center">
                <BsCalendarEvent className="text-[#ff4c00] mr-1.5 align-middle text-[0.8rem]" />
                <p>{blog.date}</p>
              </div>
            </span>
            <span>
              <div className="flex flex-row items-center">
                <FaRegClock className="text-[#ff4c00] mr-1.5 align-middle text-[0.8rem]" />
                <p>{blog.readTime.toUpperCase()} READ</p>
              </div>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
