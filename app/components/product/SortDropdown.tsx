"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export type SortOption = "default" | "price-asc" | "price-desc";

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "default", label: "ডিফল্ট" },
  { id: "price-asc", label: "দাম: কম থেকে বেশি" },
  { id: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortDropdown({
  currentSort,
  onSortChange,
}: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    SORT_OPTIONS.find((opt) => opt.id === currentSort) || SORT_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-flex items-center gap-2" ref={dropdownRef}>
      <span className="text-xs sm:text-sm font-medium text-gray-500">
        সাজান:
      </span>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-emerald-600/30 cursor-pointer"
        aria-expanded={open}
      >
        <span>{selectedOption.label}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30 animate-in fade-in slide-in-from-top-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                onSortChange(opt.id);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span
                className={
                  currentSort === opt.id
                    ? "font-semibold text-emerald-700"
                    : "font-normal"
                }
              >
                {opt.label}
              </span>
              {currentSort === opt.id && (
                <Check className="w-4 h-4 text-emerald-700" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
