import fallbackProducts from "./products-fallback.json";
import { Product, Category, OFFICIAL_CATEGORIES } from "./types";

const products: Product[] = (fallbackProducts as unknown as Product[]) || [];

/**
 * Fetch all products or filter by category - INSTANTANEOUS
 */
export async function getProducts(category?: string): Promise<Product[]> {
  if (!category) {
    return products;
  }
  return products.filter((p) => p.category === category);
}

/**
 * Fetch single product by slug or ID - INSTANTANEOUS
 */
export async function getProduct(slugOrId: string): Promise<Product | null> {
  const match = products.find(
    (p) => p.slug === slugOrId || p.id.toString() === slugOrId
  );
  return match || null;
}

/**
 * Fetch all categories - INSTANTANEOUS
 */
export async function getCategories(): Promise<Category[]> {
  return OFFICIAL_CATEGORIES;
}

/**
 * Fetch single category by slug - INSTANTANEOUS
 */
export async function getCategory(slug: string): Promise<Category | null> {
  const match = OFFICIAL_CATEGORIES.find((c) => c.slug === slug || c.id === slug);
  return match || null;
}
