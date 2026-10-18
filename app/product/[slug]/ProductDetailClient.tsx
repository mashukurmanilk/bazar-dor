"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product, formatUnitBn } from "@/app/lib/api";
import { toBengaliNumerals } from "@/app/lib/bangla-date";
import { useSession } from "@/app/lib/auth-client";
import toast from "react-hot-toast";
import { ChevronRight, Lock } from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const redirectedRef = React.useRef(false);

  useEffect(() => {
    if (!isPending && !session?.user && !redirectedRef.current) {
      redirectedRef.current = true;
      toast.error("পণ্য বিবরণ দেখতে অনুগ্রহ করে সাইন ইন করুন", { id: "protected-route" });
      router.replace(`/signin?callbackUrl=/product/${product.slug}`);
    }
  }, [isPending, session, router, product.slug]);


  if (isPending || !session?.user) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-gray-100 shadow-xs max-w-lg mx-auto text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
          <Lock className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          লগইন যাচাই করা হচ্ছে...
        </h2>
        <p className="text-sm text-gray-500">
          অনুগ্রহ করে অপেক্ষা করুন, আপনাকে সাইন ইন পেজে নেওয়া হচ্ছে
        </p>
      </div>
    );
  }

  // Calculate price stats across markets if available, or fall back to product prices
  const allMinPrices = product.markets?.map((m) => m.min) || [product.today];
  const allMaxPrices = product.markets?.map((m) => m.max) || [product.today];
  const minPrice = Math.min(...allMinPrices);
  const maxPrice = Math.max(...allMaxPrices);
  const avgPrice = Math.round(
    product.markets?.length
      ? product.markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) /
          product.markets.length
      : product.today
  );

  const priceDiff = Math.abs(product.today - product.yesterday);
  const diffBn = toBengaliNumerals(priceDiff);

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-700 transition-colors">
          হোম
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-emerald-700 transition-colors"
        >
          {product.categoryNameBn || "ক্যাটাগরি"}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-semibold">{product.nameBn}</span>
      </nav>

      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Emoji + Name + Unit + Market Summary */}
        <div className="flex items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f4f6f5] flex items-center justify-center text-3xl sm:text-4xl shrink-0">
            {product.image || product.categoryIcon || "🛒"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              {formatUnitBn(product.unit)} • {product.categoryNameBn}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-2">
              গতকালের তুলনায় আজ দাম{" "}
              {isUp && (
                <span className="font-bold text-rose-600">
                  বেড়েছে · {diffBn} টাকা
                </span>
              )}
              {isDown && (
                <span className="font-bold text-emerald-700">
                  কমেছে · {diffBn} টাকা
                </span>
              )}
              {!isUp && !isDown && (
                <span className="font-bold text-gray-600">
                  অপরিবর্তিত রয়েছে
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right Price Box */}
        <div className="bg-[#f8faf9] p-4 sm:px-6 sm:py-5 rounded-2xl border border-gray-100 shrink-0 text-center md:text-right">
          <span className="text-xs text-gray-500 font-medium block mb-1">
            আজকের দাম
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {toBengaliNumerals(product.today)}
          </div>
          <div className="text-xs text-gray-500 font-medium mt-0.5">
            টাকা / {product.unit === "kg" ? "কেজি" : product.unit === "litre" ? "লিটার" : product.unit === "dozen" ? "ডজন" : "পিস"}
          </div>
          <div className="mt-2">
            {isUp && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                ▲ {toBengaliNumerals(Math.abs(product.change.pct).toFixed(1))}%
              </span>
            )}
            {isDown && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                ▼ {toBengaliNumerals(Math.abs(product.change.pct).toFixed(1))}%
              </span>
            )}
            {!isUp && !isDown && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                — ০.০%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Middle: দামের সারসংক্ষেপ (Price Summary) */}
      <section aria-labelledby="price-summary-heading">
        <h2
          id="price-summary-heading"
          className="text-lg sm:text-xl font-bold text-gray-900 mb-4"
        >
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Minimum Price */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <span className="text-xs text-gray-500 font-medium block">
              সর্বনিম্ন দাম
            </span>
            <div className="text-2xl font-extrabold text-emerald-700 mt-2">
              {toBengaliNumerals(minPrice)} টাকা
            </div>
            <span className="text-xs text-gray-400 font-medium block mt-1">
              সবচেয়ে কম দামের বাজার
            </span>
          </div>

          {/* Maximum Price */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <span className="text-xs text-gray-500 font-medium block">
              সর্বাধিক দাম
            </span>
            <div className="text-2xl font-extrabold text-rose-600 mt-2">
              {toBengaliNumerals(maxPrice)} টাকা
            </div>
            <span className="text-xs text-gray-400 font-medium block mt-1">
              সবচেয়ে বেশি দামের বাজার
            </span>
          </div>

          {/* Average Price */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <span className="text-xs text-gray-500 font-medium block">
              গড় দাম
            </span>
            <div className="text-2xl font-extrabold text-emerald-800 mt-2">
              {toBengaliNumerals(avgPrice)} টাকা
            </div>
            <span className="text-xs text-gray-400 font-medium block mt-1">
              {formatUnitBn(product.unit)}-এর হিসাবে
            </span>
          </div>
        </div>
      </section>

      {/* Bottom: বাজারভিত্তিক আজকের দাম (Markets Table) */}
      {product.markets && product.markets.length > 0 && (
        <section aria-labelledby="markets-heading">
          <h2
            id="markets-heading"
            className="text-lg sm:text-xl font-bold text-gray-900 mb-4"
          >
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-500 font-semibold">
                    <th className="py-3.5 px-4 sm:px-6">বাজার</th>
                    <th className="py-3.5 px-4 sm:px-6">বিভাগ</th>
                    <th className="py-3.5 px-4 sm:px-6">সর্বনিম্ন</th>
                    <th className="py-3.5 px-4 sm:px-6">সর্বাধিক</th>
                    <th className="py-3.5 px-4 sm:px-6">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {product.markets.map((m, idx) => {
                    const rowAvg = Math.round((m.min + m.max) / 2);
                    return (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50/70 transition-colors"
                      >
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900">
                          {m.market}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-gray-600">
                          {m.division}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-800">
                          {toBengaliNumerals(m.min)} টাকা
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-800">
                          {toBengaliNumerals(m.max)} টাকা
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900">
                          {toBengaliNumerals(rowAvg)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
