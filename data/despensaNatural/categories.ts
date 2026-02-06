import type { Category } from "@/lib/types/product";

// ============================================
// DESPENSA NATURAL — Categorías (alineado con catálogo real)
// ============================================

export const categories: Category[] = [
  {
    id: "aceites-ghee",
    name: "Aceites & Ghee",
    slug: "aceites-ghee",
    description: "Aceites y ghee de calidad.",
  },
  {
    id: "yerbas",
    name: "Yerbas",
    slug: "yerbas",
    description: "Yerba mate y variedades.",
  },
  {
    id: "cafes",
    name: "Cafés",
    slug: "cafes",
    description: "Café en grano y molido.",
  },
  {
    id: "miel",
    name: "Miel",
    slug: "miel",
    description: "Miel pura y cremas de miel.",
  },
  {
    id: "sal-marina",
    name: "Sal Marina",
    slug: "sal-marina",
    description: "Sal marina natural.",
  },
  {
    id: "yogurt",
    name: "Yogurt",
    slug: "yogurt",
    description: "Yogurt natural.",
  },
  {
    id: "snacks-de-carne",
    name: "Snacks de Carne",
    slug: "snacks-de-carne",
    description: "Snacks de carne y jerky.",
  },
  {
    id: "cremas-de-frutos-secos",
    name: "Cremas de frutos secos",
    slug: "cremas-de-frutos-secos",
    description: "Cremas de maní, almendras y más.",
  },
  {
    id: "granola",
    name: "Granola",
    slug: "granola",
    description: "Granola artesanal.",
  },
  {
    id: "barritas",
    name: "Barritas",
    slug: "barritas",
    description: "Barritas energéticas naturales.",
  },
  {
    id: "huevos",
    name: "Huevos",
    slug: "huevos",
    description: "Huevos frescos.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
