"use client";

import React from "react";

export interface TickerItem {
  id: string;
  emoji: string;
  name: string;
  price: string;
  unit: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

const TICKER_ITEMS: TickerItem[] = [
  {
    id: "1",
    emoji: "🧅",
    name: "পেঁয়াজ",
    price: "১০০",
    unit: "কেজি",
    change: "৪.৫%",
    trend: "up",
  },
  {
    id: "2",
    emoji: "🥔",
    name: "আলু",
    price: "৫৫",
    unit: "কেজি",
    change: "১.২%",
    trend: "down",
  },
  {
    id: "3",
    emoji: "🍚",
    name: "মিনিকেট চাল",
    price: "৭২",
    unit: "কেজি",
    change: "০.৮%",
    trend: "up",
  },
  {
    id: "4",
    emoji: "🛢️",
    name: "সয়াবিন তেল",
    price: "১৮৫",
    unit: "লিটার",
    change: "২.১%",
    trend: "up",
  },
  {
    id: "5",
    emoji: "🐟",
    name: "রুই মাছ",
    price: "৩৫০",
    unit: "কেজি",
    change: "৩.৪%",
    trend: "down",
  },
  {
    id: "6",
    emoji: "🥩",
    name: "গরুর মাংস",
    price: "৭৫০",
    unit: "কেজি",
    change: "১.৫%",
    trend: "up",
  },
  {
    id: "7",
    emoji: "🥚",
    name: "ডিম",
    price: "১৫৫",
    unit: "ডজন",
    change: "০.৬%",
    trend: "up",
  },
  {
    id: "8",
    emoji: "🌶️",
    name: "কাঁচামরিচ",
    price: "১২০",
    unit: "কেজি",
    change: "৪.০%",
    trend: "down",
  },
  {
    id: "9",
    emoji: "🍅",
    name: "টমেটো",
    price: "৬০",
    unit: "কেজি",
    change: "২.৫%",
    trend: "down",
  },
  {
    id: "10",
    emoji: "🧄",
    name: "রসুন",
    price: "২১০",
    unit: "কেজি",
    change: "১.০%",
    trend: "up",
  },
  {
    id: "11",
    emoji: "🍗",
    name: "ব্রয়লার মুরগি",
    price: "১৯০",
    unit: "কেজি",
    change: "১.৮%",
    trend: "up",
  },
];

export default function PriceTicker() {
  // Duplicate array for seamless infinite marquee loop
  const displayItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="w-full bg-[#f8faf9] border-b border-gray-200/70 overflow-hidden select-none py-1.5"
      aria-label="বাজার দর তাজা আপডেট স্ক্রোল"
    >
      <div className="flex animate-marquee items-center">
        {displayItems.map((item, index) => {
          const isUp = item.trend === "up";
          const isDown = item.trend === "down";

          return (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center text-xs sm:text-[13px] font-medium text-gray-700 mx-3 sm:mx-4 shrink-0 transition-opacity hover:opacity-80"
            >
              {/* Item emoji & name */}
              <span className="mr-1.5 text-sm sm:text-base">{item.emoji}</span>
              <span className="font-semibold text-gray-900 mr-1.5">
                {item.name}
              </span>

              {/* Price & Unit */}
              <span className="text-gray-600 mr-2">
                {item.price} টাকা/{item.unit}
              </span>

              {/* Up / Down change percentage badge */}
              <span
                className={`inline-flex items-center gap-0.5 text-[11px] sm:text-xs font-bold px-1.5 py-0.5 rounded ${
                  isUp
                    ? "text-rose-600 bg-rose-50"
                    : isDown
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-gray-500 bg-gray-100"
                }`}
              >
                {isUp && <span>▲</span>}
                {isDown && <span>▼</span>}
                <span>{item.change}</span>
              </span>

              {/* Divider dot */}
              <span className="ml-3 sm:ml-4 text-gray-300 text-xs">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
