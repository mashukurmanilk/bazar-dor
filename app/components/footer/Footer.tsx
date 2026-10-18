import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f4f6f5] border-t border-gray-200/80 mt-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-[13px] text-gray-500 font-medium text-center sm:text-left">
        <div>
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>
        <div>
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
}
