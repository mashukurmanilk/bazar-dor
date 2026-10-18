"use client";

import React from "react";
import Logo from "./Logo";
import AuthButtons from "./AuthButtons";
import CategoryBar from "./CategoryBar";
import PriceTicker from "./PriceTicker";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      {/* Top Navbar: Logo & Bangla Date on left, Auth / User Profile on right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Logo />
          <AuthButtons />
        </div>
      </div>

      {/* Second Row: Category navigation links */}
      <CategoryBar />

      {/* Price Ticker: Infinite scrolling strip */}
      <PriceTicker />
    </header>
  );
}
