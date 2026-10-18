"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: "chal", name: "চাল", icon: "🍚" },
  { id: "dal", name: "ডাল", icon: "🫘" },
  { id: "tel", name: "তেল", icon: "🛢️" },
  { id: "sobji", name: "সবজি", icon: "🥬" },
  { id: "mach", name: "মাছ", icon: "🐟" },
  { id: "mangsho", name: "মাংস", icon: "🍗" },
  { id: "dim-dui", name: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", name: "মসলা", icon: "🌶️" },
];

function CategoryList() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get("category");

  return (
    <div className="w-full flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-2.5 px-4 sm:px-6 gap-2 sm:gap-3">
      {CATEGORIES.map((cat) => {
        const isActive =
          pathname === `/category/${cat.id}` ||
          (pathname === "/" && queryCategory === cat.id);

        return (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer select-none active:scale-95 ${
              isActive
                ? "bg-emerald-700 text-white shadow-xs font-semibold"
                : "bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 hover:text-gray-900"
            }`}
            aria-pressed={isActive}
          >
            <span className="text-sm sm:text-base leading-none">{cat.icon}</span>
            <span>{cat.name}</span>
          </Link>
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
