"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/app/lib/api";
import ProductCard from "@/app/components/product/ProductCard";
import SortDropdown, { SortOption } from "@/app/components/product/SortDropdown";
import { toBengaliNumerals } from "@/app/lib/bangla-date";

interface HomeProductsProps {
  initialProducts: Product[];
}

export default function HomeProducts({ initialProducts }: HomeProductsProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  // Top 6 risers: change.dir === 'up', sorted by pct descending
  const risers = useMemo(() => {
    return [...initialProducts]
      .filter((p) => p.change.dir === "up")
      .sort((a, b) => b.change.pct - a.change.pct)
      .slice(0, 6);
  }, [initialProducts]);

  // Top 6 fallers: change.dir === 'down', sorted by biggest drop (most negative)
  const fallers = useMemo(() => {
    return [...initialProducts]
      .filter((p) => p.change.dir === "down")
      .sort((a, b) => a.change.pct - b.change.pct)
      .slice(0, 6);
  }, [initialProducts]);

  // All products sorted based on selected sort option (Challenge C1: numeric sorting)
  const sortedAllProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortOption === "price-asc") {
      return list.sort((a, b) => a.today - b.today);
    }
    if (sortOption === "price-desc") {
      return list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [initialProducts, sortOption]);

  return (
    <div className="space-y-12">
      {/* Section A — “আজ দাম বেড়েছে ▲”: Top 6 risers */}
      {risers.length > 0 && (
        <section aria-labelledby="risers-heading">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-rose-600 font-bold text-lg leading-none">▲</span>
            <h2
              id="risers-heading"
              className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight"
            >
              আজ দাম বেড়েছে
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section B — “আজ দাম কমেছে ▼”: Top 6 fallers */}
      {fallers.length > 0 && (
        <section aria-labelledby="fallers-heading">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-emerald-700 font-bold text-lg leading-none">▼</span>
            <h2
              id="fallers-heading"
              className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight"
            >
              আজ দাম কমেছে
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section C — “সব পণ্য” (Anchor link target #সব-পণ্য) */}
      <section id="সব-পণ্য" className="scroll-mt-36" aria-labelledby="all-products-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2
              id="all-products-heading"
              className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight"
            >
              সব পণ্য
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              আজকের বাজারে মোট {toBengaliNumerals(sortedAllProducts.length)}টি পণ্য তালিকাভুক্ত আছে
            </p>
          </div>

          {/* Sort Dropdown (Challenge C1) */}
          <SortDropdown
            currentSort={sortOption}
            onSortChange={(sort) => setSortOption(sort)}
          />
        </div>

        {/* Responsive Grid: 3 cols on large, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedAllProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
