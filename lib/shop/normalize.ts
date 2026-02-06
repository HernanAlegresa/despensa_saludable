import type { ShopFilters, Size } from "@/lib/types/product";

export function parseFiltersFromSearchParams(
  searchParams: URLSearchParams
): ShopFilters {
  const filters: ShopFilters = {};

  // Category (also accept "collection" parameter for the same filter)
  const category = searchParams.get("category") || searchParams.get("collection");
  if (category) {
    filters.category = category.split(",").filter(Boolean);
  }

  // Size
  const size = searchParams.get("size");
  if (size) {
    const sizes = size.split(",").filter(Boolean) as Size[];
    // Validate sizes
    const validSizes: Size[] = ["XS", "S", "M", "L", "XL", "One Size"];
    filters.size = sizes.filter((s) => validSizes.includes(s));
  }

  // Color
  const color = searchParams.get("color");
  if (color) {
    filters.color = color.split(",").filter(Boolean);
  }

  // Min Price
  const minPrice = searchParams.get("minPrice");
  if (minPrice) {
    const parsed = parseFloat(minPrice);
    if (!isNaN(parsed) && parsed >= 0) {
      filters.minPrice = parsed;
    }
  }

  // Max Price
  const maxPrice = searchParams.get("maxPrice");
  if (maxPrice) {
    const parsed = parseFloat(maxPrice);
    if (!isNaN(parsed) && parsed >= 0) {
      filters.maxPrice = parsed;
    }
  }

  // Validate price range
  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    if (filters.minPrice > filters.maxPrice) {
      // Swap if min > max
      [filters.minPrice, filters.maxPrice] = [
        filters.maxPrice,
        filters.minPrice,
      ];
    }
  }

  return filters;
}

export function buildSearchParamsFromFilters(
  filters: ShopFilters,
  search?: string,
  sort?: string
): URLSearchParams {
  const params = new URLSearchParams();

  if (search && search.trim()) {
    params.set("q", search.trim());
  }

  if (sort) {
    params.set("sort", sort);
  }

  if (filters.category && filters.category.length > 0) {
    params.set("category", filters.category.join(","));
  }

  if (filters.size && filters.size.length > 0) {
    params.set("size", filters.size.join(","));
  }

  if (filters.color && filters.color.length > 0) {
    params.set("color", filters.color.join(","));
  }

  if (filters.minPrice !== undefined) {
    params.set("minPrice", filters.minPrice.toString());
  }

  if (filters.maxPrice !== undefined) {
    params.set("maxPrice", filters.maxPrice.toString());
  }

  return params;
}

export function hasActiveFilters(filters: ShopFilters): boolean {
  return !!(
    (filters.category && filters.category.length > 0) ||
    (filters.size && filters.size.length > 0) ||
    (filters.color && filters.color.length > 0) ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined
  );
}
