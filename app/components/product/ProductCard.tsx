"use client";

import React from "react";
import Link from "next/link";
import { Product, formatUnitBn } from "@/app/lib/api";
import { toBengaliNumerals } from "@/app/lib/bangla-date";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  // Format today's price with comma formatting converted to Bengali
  const formattedPrice = toBengaliNumerals(
    product.today.toLocaleString("en-IN")
  );

  // Format percentage in Bengali
  const formattedPct = toBengaliNumerals(
    Math.abs(product.change.pct).toFixed(1)
  );

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-white rounded-2xl p-5 border border-gray-100/90 shadow-xs hover:shadow-md hover:border-emerald-600/30 transition-all duration-200 flex flex-col justify-between"
    >
      {/* Top Header: Emoji Thumbnail + Name + Unit */}
      <div className="flex items-start gap-3.5 mb-4">
        {/* Emoji Container */}
        <div className="w-12 h-12 rounded-2xl bg-[#f4f6f5] flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        {/* Product Name & Unit */}
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 text-base sm:text-[17px] leading-tight truncate group-hover:text-emerald-800 transition-colors">
            {product.nameBn}
          </h3>
          <p className="text-xs sm:text-[13px] text-gray-400 font-medium mt-1">
            {formatUnitBn(product.unit)}
          </p>
        </div>
      </div>

      {/* Bottom Price Row: Label "আজকের দাম", Value, and Change Badge */}
      <div className="pt-3 border-t border-gray-100 flex items-end justify-between">
        <div>
          <span className="block text-[11px] text-gray-400 font-medium leading-none mb-1">
            আজকের দাম
          </span>
          <span className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
            {formattedPrice} <span className="text-sm font-medium text-gray-600">টাকা</span>
          </span>
        </div>

        {/* Price Change Badge */}
        <div>
          {isUp && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">
              <span>▲</span>
              <span>{formattedPct}%</span>
            </span>
          )}
          {isDown && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
              <span>▼</span>
              <span>{formattedPct}%</span>
            </span>
          )}
          {!isUp && !isDown && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
              <span>—</span>
              <span>০.০%</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
