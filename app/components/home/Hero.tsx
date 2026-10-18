import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-100 shadow-xs mb-10 overflow-hidden relative">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Eyebrow badge */}
          <div className="inline-block bg-emerald-100/80 text-emerald-800 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full mb-4">
            শুক্রবার, ৩ অক্টোবর ২০২৫
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 font-normal">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মশলার দাম — বাংলাদেশর নির্ভরযোগ্য, সহজ, নিয়মিত আপডেটেড বাজার দর আপনার হাতের মুঠোয়
          </p>

          {/* Primary CTA button linking to #সব-পণ্য section */}
          <div>
            <a
              href="#সব-পণ্য"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 font-semibold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer text-sm sm:text-base"
            >
              আজকের দর দেখুন
            </a>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] shrink-0 flex items-center justify-center">
          <Image
            src="/images/bazar-hero.png"
            alt="বাজার দর ঝুড়ি"
            width={380}
            height={300}
            priority
            className="w-full h-auto object-contain drop-shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}
