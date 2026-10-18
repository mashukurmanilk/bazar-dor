import React from "react";
import Link from "next/link";

interface LogoProps {
  dateText?: string;
}

export default function Logo({ dateText }: LogoProps) {
  // Matches Figma default "শুক্রবার, ৩ অক্টোবর ২০২৫" or custom dateText
  const displayDate = dateText || "শুক্রবার, ৩ অক্টোবর ২০২৫";


  return (
    <Link
      href="/"
      className="flex items-center gap-3 group transition-transform active:scale-95"
      aria-label="বাজার দর হোমপেজ"
    >
      {/* Green logo icon box */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-sm ring-1 ring-emerald-800/20 group-hover:bg-emerald-800 transition-colors shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      </div>

      {/* Brand title & Bangla date */}
      <div className="flex flex-col justify-center">
        <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight tracking-tight flex items-center gap-1.5 font-sans">
          বাজার দর
        </span>
        <span className="text-xs sm:text-[13px] text-gray-500 font-medium leading-none mt-0.5">
          {displayDate}
        </span>
      </div>
    </Link>
  );
}
