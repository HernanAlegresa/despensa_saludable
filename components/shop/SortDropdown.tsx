"use client";

import { useShopSort } from "@/hooks/useShopSort";
import { useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/select";
import type { SortOption } from "@/lib/types/product";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevancia" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "name-asc", label: "Nombre: A a Z" },
  { value: "name-desc", label: "Nombre: Z a A" },
  { value: "newest", label: "Más recientes" },
];

export function SortDropdown() {
  const { currentSort, updateSort } = useShopSort();
  const searchParams = useSearchParams();
  const hasSearch = !!searchParams.get("q");

  // Show "Relevance" only when there's a search query
  const visibleOptions = hasSearch
    ? sortOptions
    : sortOptions.filter((opt) => opt.value !== "relevance");

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Ordenar:
      </label>
      <Select
        id="sort"
        value={currentSort === "relevance" && !hasSearch ? "newest" : currentSort}
        onChange={(e) => updateSort(e.target.value as SortOption)}
        className="w-48"
        aria-label="Ordenar productos"
      >
        {visibleOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
