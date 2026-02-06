// Product type definitions for the store
// Size supports literal (template) or string (e.g. "500 g", "1 kg", "3 L", "30 u") for variant labels
export type Size = "XS" | "S" | "M" | "L" | "XL" | "One Size" | (string & {});

export type Color = {
  name: string;
  hex: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: Category;
  collection: Collection;
  sizes: Size[];
  colors: Color[];
  inStock: boolean;
  featured?: boolean;
  createdAt: string;
  /** Brand name when applicable */
  brand?: string;
};

export type ShopFilters = {
  category?: string[];
  collection?: string[];
  size?: Size[];
  color?: string[];
  minPrice?: number;
  maxPrice?: number;
};

export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest";
