import type { Category } from "@/lib/types/product";

// ============================================
// DESPENSA NATURAL — Categorías
// ============================================

export const categories: Category[] = [
  {
    id: "granolas",
    name: "Granolas",
    slug: "granolas",
    description: "Granolas artesanales sin azúcar añadido.",
  },
  {
    id: "frutos-secos",
    name: "Frutos secos",
    slug: "frutos-secos",
    description: "Frutos secos y mezclas para snack.",
  },
  {
    id: "mieles",
    name: "Mieles",
    slug: "mieles",
    description: "Miel pura y cremas de miel.",
  },
  {
    id: "snacks",
    name: "Snacks",
    slug: "snacks",
    description: "Snacks naturales y barras.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
