import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xs text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 text-3xl shadow-2xs">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="text-4xl font-extrabold text-emerald-800 mb-2">
          ৪০৪
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          পৃষ্ঠাটি পাওয়া যায়নি
        </h1>

        <p className="text-sm text-gray-500 mb-6 font-normal">
          দুঃখিত, আপনি যে লিংকটিতে প্রবেশ করার চেষ্টা করছেন তা বর্তমানে বিদ্যমান নেই বা স্থানান্তরিত হয়েছে।
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 font-semibold shadow-xs transition-all active:scale-95 text-sm sm:text-base cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}
