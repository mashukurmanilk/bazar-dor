"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product, Category } from "@/app/lib/types";
import ProductCard from "@/app/components/product/ProductCard";
import SortDropdown, { SortOption } from "@/app/components/product/SortDropdown";
import { toBengaliNumerals } from "@/app/lib/bangla-date";
import { ArrowLeft, PackageSearch } from "lucide-react";

interface CategoryProductsClientProps {
  category: Category;
  initialProducts: Product[];
}

export default function CategoryProductsClient({
  category,
  initialProducts,
}: CategoryProductsClientProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  // Numeric sorting for Challenge C1
  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortOption === "price-asc") {
      return list.sort((a, b) => a.today - b.today);
    }
    if (sortOption === "price-desc") {
      return list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [initialProducts, sortOption]);

  if (initialProducts.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs max-w-lg mx-auto my-12">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 text-3xl">
          <PackageSearch className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          কোনো পণ্য পাওয়া যায়নি
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          দুঃখিত, এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 font-semibold text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Hero / Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex items-center gap-4 sm:gap-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f4f6f5] flex items-center justify-center text-3xl sm:text-4xl shrink-0">
          {category.icon || "🛒"}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {category.nameBn}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            {toBengaliNumerals(initialProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sort Row & Product Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-transparent px-1">
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          মোট {toBengaliNumerals(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <SortDropdown
          currentSort={sortOption}
          onSortChange={(sort) => setSortOption(sort)}
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
