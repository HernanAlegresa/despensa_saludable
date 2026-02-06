"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ShopFilters, Size } from "@/lib/types/product";
import {
  parseFiltersFromSearchParams,
  buildSearchParamsFromFilters,
  hasActiveFilters,
} from "@/lib/shop/normalize";

export function useShopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseFiltersFromSearchParams(searchParams),
    [searchParams]
  );

  const hasFilters = useMemo(
    () => hasActiveFilters(filters),
    [filters]
  );

  const updateFilters = useCallback(
    (newFilters: Partial<ShopFilters>) => {
      const updatedFilters: ShopFilters = {
        ...filters,
        ...newFilters,
      };

      // Remove empty arrays
      if (updatedFilters.category && updatedFilters.category.length === 0) {
        delete updatedFilters.category;
      }
      if (updatedFilters.size && updatedFilters.size.length === 0) {
        delete updatedFilters.size;
      }
      if (updatedFilters.color && updatedFilters.color.length === 0) {
        delete updatedFilters.color;
      }

      const params = buildSearchParamsFromFilters(
        updatedFilters,
        searchParams.get("q") || undefined,
        searchParams.get("sort") || undefined
      );

      router.push(`/catalogo?${params.toString()}`);
    },
    [filters, router, searchParams]
  );

  const toggleCategory = useCallback(
    (categorySlug: string) => {
      const currentCategories = filters.category || [];
      const newCategories = currentCategories.includes(categorySlug)
        ? currentCategories.filter((c) => c !== categorySlug)
        : [...currentCategories, categorySlug];

      updateFilters({ category: newCategories });
    },
    [filters.category, updateFilters]
  );

  const toggleSize = useCallback(
    (size: Size) => {
      const currentSizes = filters.size || [];
      const newSizes = currentSizes.includes(size)
        ? currentSizes.filter((s) => s !== size)
        : [...currentSizes, size];

      updateFilters({ size: newSizes });
    },
    [filters.size, updateFilters]
  );

  const toggleColor = useCallback(
    (colorName: string) => {
      const currentColors = filters.color || [];
      const newColors = currentColors.includes(colorName)
        ? currentColors.filter((c) => c !== colorName)
        : [...currentColors, colorName];

      updateFilters({ color: newColors });
    },
    [filters.color, updateFilters]
  );

  const setPriceRange = useCallback(
    (min?: number, max?: number) => {
      updateFilters({
        minPrice: min,
        maxPrice: max,
      });
    },
    [updateFilters]
  );

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams();
    const search = searchParams.get("q");
    const sort = searchParams.get("sort");

    if (search) params.set("q", search);
    if (sort) params.set("sort", sort);

    const queryString = params.toString();
    router.push(queryString ? `/catalogo?${queryString}` : "/catalogo");
  }, [router, searchParams]);

  const removeFilter = useCallback(
    (type: keyof ShopFilters, value: string | Size) => {
      if (type === "category") {
        const newCategories = (filters.category || []).filter(
          (c) => c !== value
        );
        updateFilters({ category: newCategories });
      } else if (type === "size") {
        const newSizes = (filters.size || []).filter((s) => s !== value);
        updateFilters({ size: newSizes });
      } else if (type === "color") {
        const newColors = (filters.color || []).filter((c) => c !== value);
        updateFilters({ color: newColors });
      } else if (type === "minPrice" || type === "maxPrice") {
        updateFilters({ [type]: undefined });
      }
    },
    [filters, updateFilters]
  );

  return {
    filters,
    hasFilters,
    updateFilters,
    toggleCategory,
    toggleSize,
    toggleColor,
    setPriceRange,
    clearFilters,
    removeFilter,
  };
}
