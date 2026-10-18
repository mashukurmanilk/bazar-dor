import React, { Suspense } from "react";
import Link from "next/link";
import { getCategory, getProducts } from "@/app/lib/api";
import CategoryProductsClient from "./CategoryProductsClient";
import ProductSkeleton from "@/app/components/product/ProductSkeleton";
import { ArrowLeft, AlertCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function CategoryContent({ params }: PageProps) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  if (!category) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs max-w-lg mx-auto my-12">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 text-3xl">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ক্যাটাগরি পাওয়া যায়নি
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          দুঃখিত, আপনি যে ক্যাটাগরিটি খুঁজছেন তা খুঁজে পাওয়া যায়নি বা অনুপলব্ধ।
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
    <CategoryProductsClient
      category={category}
      initialProducts={products}
    />
  );
}

export default function CategoryPage({ params }: PageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Suspense fallback={<ProductSkeleton count={6} />}>
        <CategoryContent params={params} />
      </Suspense>
    </div>
  );
}

