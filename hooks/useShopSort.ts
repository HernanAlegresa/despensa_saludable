"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { SortOption } from "@/lib/types/product";

const DEFAULT_SORT: SortOption = "relevance";

export function useShopSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = (searchParams.get("sort") as SortOption) || DEFAULT_SORT;

  const updateSort = (sort: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (sort === DEFAULT_SORT) {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }

    const queryString = params.toString();
    router.push(queryString ? `/catalogo?${queryString}` : "/catalogo");
  };

  return {
    currentSort,
    updateSort,
  };
}
