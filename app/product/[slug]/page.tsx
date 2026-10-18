import React from "react";
import Link from "next/link";
import { getProduct } from "@/app/lib/api";
import ProductDetailClient from "./ProductDetailClient";
import { ArrowLeft, AlertCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function ProductContent({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 text-3xl">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          পণ্যটি পাওয়া যায়নি
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          দুঃখিত, আপনি যে পণ্যটির বিস্তারিত দেখতে চেয়েছেন তা ডাটাবেজে খুঁজে পাওয়া যায়নি।
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

  return <ProductDetailClient product={product} />;
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <React.Suspense
        fallback={
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-24 bg-gray-100 rounded-2xl"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 bg-gray-100 rounded-2xl"></div>
              <div className="h-20 bg-gray-100 rounded-2xl"></div>
              <div className="h-20 bg-gray-100 rounded-2xl"></div>
            </div>
          </div>
        }
      >
        <ProductContent params={params} />
      </React.Suspense>
    </div>
  );
}

