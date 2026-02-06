"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SEARCH_DEBOUNCE_MS = 300;
const MAX_SEARCH_LENGTH = 100;

export function useShopSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("q") || ""
  );

  useEffect(() => {
    const currentQuery = searchParams.get("q") || "";
    if (currentQuery !== searchQuery) {
      setSearchQuery(currentQuery);
    }
  }, [searchParams, searchQuery]);

  const updateSearch = useCallback(
    (query: string) => {
      // Limit search length
      const trimmedQuery = query.slice(0, MAX_SEARCH_LENGTH);
      setSearchQuery(trimmedQuery);

      // Debounce URL update
      const timeoutId = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (trimmedQuery.trim()) {
          params.set("q", encodeURIComponent(trimmedQuery.trim()));
        } else {
          params.delete("q");
        }

        // Reset to page 1 when searching
        params.delete("page");

        const queryString = params.toString();
        router.push(queryString ? `/catalogo?${queryString}` : "/catalogo");
      }, SEARCH_DEBOUNCE_MS);

      return () => clearTimeout(timeoutId);
    },
    [router, searchParams]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("page");

    const queryString = params.toString();
    router.push(queryString ? `/catalogo?${queryString}` : "/catalogo");
  }, [router, searchParams]);

  return {
    searchQuery,
    updateSearch,
    clearSearch,
  };
}
