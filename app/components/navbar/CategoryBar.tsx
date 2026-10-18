"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: "vegetables", name: "সবজি", icon: "🥬" },
  { id: "rice", name: "চাল", icon: "🍚" },
  { id: "oil", name: "তেল", icon: "🛢️" },
  { id: "onion", name: "পেঁয়াজ", icon: "🧅" },
  { id: "fish", name: "মাছ", icon: "🐟" },
  { id: "meat", name: "মাংস", icon: "🥩" },
  { id: "dairy", name: "ডিম/দুধ", icon: "🥚" },
  { id: "spices", name: "মসলা", icon: "🌶️" },
];

function CategoryList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategoryId = searchParams.get("category") || "vegetables";

  const handleCategorySelect = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", categoryId);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-2.5 px-4 sm:px-6 gap-2 sm:gap-3">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategoryId === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer select-none active:scale-95 ${
              isActive
                ? "bg-emerald-700 text-white shadow-xs font-semibold"
                : "bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 hover:text-gray-900"
            }`}
            aria-pressed={isActive}
          >
            <span className="text-sm sm:text-base leading-none">{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function CategoryBar() {
  return (
    <div className="border-t border-b border-gray-100/90 bg-white/80">
      <Suspense
        fallback={
          <div className="w-full flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-2.5 px-4 sm:px-6 gap-2 sm:gap-3">
            {CATEGORIES.map((cat, idx) => (
              <div
                key={cat.id}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm shrink-0 ${
                  idx === 0
                    ? "bg-emerald-700 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        }
      >
        <CategoryList />
      </Suspense>
    </div>
  );
}
