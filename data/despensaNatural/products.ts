import type { Product, Size } from "@/lib/types/product";
import { getCategoryById } from "./categories";
import { getCollectionById } from "./collections";

// ============================================
// DESPENSA NATURAL — Productos
// ============================================
// Variantes: uso de Size para peso/tamaño (S=250g, M=500g, L=1kg, One Size=único).
// Colores: un único color placeholder para cumplir tipo.

const getCat = (id: string) => getCategoryById(id)!;
const getCol = (id: string) => getCollectionById(id)!;

const oneSize: Size[] = ["One Size"];
const smallMediumLarge: Size[] = ["S", "M", "L"];

export const products: Product[] = [
  {
    id: "granola-clasica",
    name: "Granola clásica",
    slug: "granola-clasica",
    description:
      "Granola artesanal con avena, nueces, coco y miel. Sin azúcar añadido, ideal para desayuno.",
    price: 320,
    images: ["/placeholders/product.svg"],
    category: getCat("granolas"),
    collection: getCol("granolas"),
    sizes: smallMediumLarge,
    colors: [{ name: "Único", hex: "#8B7355" }],
    inStock: true,
    featured: true,
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "granola-frutas",
    name: "Granola con frutas",
    slug: "granola-frutas",
    description:
      "Granola con trozos de fruta deshidratada, semillas y especias. Sin conservantes.",
    price: 380,
    images: ["/placeholders/product.svg"],
    category: getCat("granolas"),
    collection: getCol("granolas"),
    sizes: smallMediumLarge,
    colors: [{ name: "Único", hex: "#8B7355" }],
    inStock: true,
    featured: true,
    createdAt: "2026-01-02T00:00:00Z",
  },
  {
    id: "mix-frutos-secos",
    name: "Mix frutos secos",
    slug: "mix-frutos-secos",
    description:
      "Mezcla de almendras, nueces, castañas de cajú y pasas. Sin sal añadida.",
    price: 450,
    images: ["/placeholders/product.svg"],
    category: getCat("frutos-secos"),
    collection: getCol("frutos-secos"),
    sizes: smallMediumLarge,
    colors: [{ name: "Único", hex: "#C4A574" }],
    inStock: true,
    featured: false,
    createdAt: "2026-01-03T00:00:00Z",
  },
  {
    id: "miel-pura",
    name: "Miel pura",
    slug: "miel-pura",
    description:
      "Miel de abeja pura, sin pasteurizar. Origen local.",
    price: 280,
    images: ["/placeholders/product.svg"],
    category: getCat("mieles"),
    collection: getCol("mieles"),
    sizes: smallMediumLarge,
    colors: [{ name: "Único", hex: "#D4A017" }],
    inStock: true,
    featured: true,
    createdAt: "2026-01-04T00:00:00Z",
  },
  {
    id: "crema-miel-nuez",
    name: "Crema de miel y nuez",
    slug: "crema-miel-nuez",
    description:
      "Crema untable de miel con nueces trituradas. Ideal para tostadas.",
    price: 350,
    images: ["/placeholders/product.svg"],
    category: getCat("mieles"),
    collection: getCol("mieles"),
    sizes: ["One Size"],
    colors: [{ name: "Único", hex: "#B8860B" }],
    inStock: true,
    featured: false,
    createdAt: "2026-01-05T00:00:00Z",
  },
  {
    id: "barra-datiles",
    name: "Barra de dátiles y nueces",
    slug: "barra-datiles",
    description:
      "Barra energética natural: dátiles, nueces y coco. Sin azúcar añadido.",
    price: 180,
    images: ["/placeholders/product.svg"],
    category: getCat("snacks"),
    collection: getCol("snacks"),
    sizes: oneSize,
    colors: [{ name: "Único", hex: "#5C4033" }],
    inStock: true,
    featured: true,
    createdAt: "2026-01-06T00:00:00Z",
  },
  {
    id: "tapenade-aceitunas",
    name: "Tapenade de aceitunas",
    slug: "tapenade-aceitunas",
    description:
      "Pasta de aceitunas negras con hierbas. Para pan, tostadas o ensaladas.",
    price: 220,
    images: ["/placeholders/product.svg"],
    category: getCat("snacks"),
    collection: getCol("snacks"),
    sizes: oneSize,
    colors: [{ name: "Único", hex: "#2C1810" }],
    inStock: true,
    featured: false,
    createdAt: "2026-01-07T00:00:00Z",
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category?.slug === categorySlug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection?.slug === collectionSlug);
}
