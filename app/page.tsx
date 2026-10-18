import React, { Suspense } from "react";
import Hero from "./components/home/Hero";
import HomeProducts from "./components/home/HomeProducts";
import ProductSkeleton from "./components/product/ProductSkeleton";
import { getProducts } from "./lib/api";

async function ProductsLoader() {
  const products = await getProducts();
  return <HomeProducts initialProducts={products} />;
}

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 2. Hero / Banner */}
      <Hero />

      {/* 3. The Product Sections (Home Page) */}
      <Suspense fallback={<ProductSkeleton count={9} />}>
        <ProductsLoader />
      </Suspense>
    </div>
  );
}
