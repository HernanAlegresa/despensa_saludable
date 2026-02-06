"use client";

import { useMemo } from "react";
import { useShopFilters } from "@/hooks/useShopFilters";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Size } from "@/lib/types/product";

export function FilterChips() {
  const { filters, removeFilter, hasFilters } = useShopFilters();

  const chips = useMemo(() => {
    if (!hasFilters) return [];

    const chipArray: Array<{ type: keyof typeof filters; label: string; value: string | Size }> = [];

    // Category chips
    filters.category?.forEach((cat) => {
      chipArray.push({
        type: "category",
        label: `Categoría: ${cat.replace(/-/g, " ")}`,
        value: cat,
      });
    });

    // Size chips
    filters.size?.forEach((size) => {
      chipArray.push({
        type: "size",
        label: `Tamaño: ${size}`,
        value: size,
      });
    });

    // Color chips
    filters.color?.forEach((color) => {
      chipArray.push({
        type: "color",
        label: `Color: ${color}`,
        value: color,
      });
    });

    // Price chips
    if (filters.minPrice !== undefined) {
      chipArray.push({
        type: "minPrice",
        label: `Mín: $${filters.minPrice.toFixed(0)}`,
        value: filters.minPrice.toString(),
      });
    }

    if (filters.maxPrice !== undefined) {
      chipArray.push({
        type: "maxPrice",
        label: `Max: $${filters.maxPrice.toFixed(2)}`,
        value: filters.maxPrice.toString(),
      });
    }

    return chipArray;
  }, [filters, hasFilters]);

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip, index) => (
        <button
          key={`${chip.type}-${chip.value}-${index}`}
          onClick={() => removeFilter(chip.type, chip.value)}
          className={cn(
            "inline-flex items-center gap-1 px-3 py-1 rounded-full",
            "bg-gray-100 text-gray-700 text-sm",
            "hover:bg-gray-200 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          )}
          aria-label={`Quitar filtro ${chip.label}`}
        >
          <span>{chip.label}</span>
          <X className="h-3 w-3" />
        </button>
      ))}
    </div>
  );
}
