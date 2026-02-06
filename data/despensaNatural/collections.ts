import type { Collection } from "@/lib/types/product";

// ============================================
// DESPENSA NATURAL — Colecciones (misma taxonomía que categorías)
// ============================================

export const collections: Collection[] = [
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

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}
