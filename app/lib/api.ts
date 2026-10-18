/**
 * Bazar Dor API Client with multi-base URL fallback and Bengali utilities
 */

export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface PriceChange {
  dir: "up" | "down" | "flat";
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: MarketPrice[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const API_ENDPOINTS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchFromApi<T>(path: string): Promise<T | null> {
  for (const baseUrl of API_ENDPOINTS) {
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const data = await res.json();
        return data as T;
      }
    } catch {
      // Continue to next endpoint on failure
    }
  }
  return null;
}

/**
 * Fetch all products or filter by category
 */
export async function getProducts(category?: string): Promise<Product[]> {
  const path = category ? `/products?category=${encodeURIComponent(category)}` : "/products";
  const data = await fetchFromApi<Product[]>(path);
  if (data && Array.isArray(data)) {
    return data;
  }
  // If category-specific call fails, try fetching all and filtering in-memory
  if (category) {
    const all = await fetchFromApi<Product[]>("/products");
    if (all && Array.isArray(all)) {
      return all.filter((p) => p.category === category);
    }
  }
  return [];
}

/**
 * Fetch single product by slug or ID
 */
export async function getProduct(slugOrId: string): Promise<Product | null> {
  // If it's a numeric ID, try direct endpoint
  if (/^\d+$/.test(slugOrId)) {
    const direct = await fetchFromApi<Product>(`/products/${slugOrId}`);
    if (direct && direct.id) return direct;
  }

  // Otherwise or if direct failed, search in all products by slug or id
  const allProducts = await getProducts();
  const match = allProducts.find(
    (p) => p.slug === slugOrId || p.id.toString() === slugOrId
  );
  return match || null;
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  const data = await fetchFromApi<Category[]>("/categories");
  if (data && Array.isArray(data)) {
    return data;
  }
  // Fallback default categories
  return [
    { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
    { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
    { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
    { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
    { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
    { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
    { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
    { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
  ];
}

/**
 * Fetch single category by slug
 */
export async function getCategory(slug: string): Promise<Category | null> {
  const direct = await fetchFromApi<Category>(`/categories/${encodeURIComponent(slug)}`);
  if (direct && direct.nameBn) return direct;

  const all = await getCategories();
  return all.find((c) => c.slug === slug || c.id === slug) || null;
}

/**
 * Format unit into Bengali label
 */
export function formatUnitBn(unit: string): string {
  switch (unit.toLowerCase()) {
    case "kg":
      return "প্রতি কেজি";
    case "litre":
    case "liter":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
    case "pc":
      return "প্রতি পিস";
    default:
      return `প্রতি ${unit}`;
  }
}
