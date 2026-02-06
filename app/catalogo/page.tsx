import { Suspense } from "react";
import { getAllProducts } from "@/data/despensaNatural";
import { filterProducts, sortProducts } from "@/lib/shop/filters";
import { parseFiltersFromSearchParams } from "@/lib/shop/normalize";
import { FilterPanel } from "@/components/shop/FilterPanel";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { FilterChips } from "@/components/shop/FilterChips";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { EmptyState } from "@/components/shop/EmptyState";
import { MobileFilterTrigger } from "@/components/shop/MobileFilterTrigger";
import { ProductGridSkeleton } from "@/components/shop/ProductGridSkeleton";
import type { SortOption } from "@/lib/types/product";

type Props = {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    category?: string;
    size?: string;
    color?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

function CatalogoContent({ searchParams }: Props) {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <CatalogoPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function CatalogoPageContent({ searchParams }: Props) {
  const params = await searchParams;
  const searchQuery = params.q || "";
  const sortOption = (params.sort as SortOption) || "relevance";

  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) urlParams.set(key, value);
  });
  const filters = parseFiltersFromSearchParams(urlParams);

  const allProducts = getAllProducts();
  const filteredProducts = filterProducts(allProducts, filters, searchQuery);
  const sortedProducts = sortProducts(filteredProducts, sortOption, searchQuery);

  return (
    <div className="container mx-auto px-4 pt-20 pb-8">
      <div className="mb-4 md:hidden">
        <MobileFilterTrigger resultCount={sortedProducts.length} />
      </div>

      <div className="mb-6">
        <FilterChips />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block">
          <FilterPanel />
        </aside>

        <div className="flex-1">
          {sortedProducts.length > 0 ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <SortDropdown />
                <span className="text-sm text-gray-600">
                  {sortedProducts.length} producto{sortedProducts.length !== 1 ? "s" : ""}
                </span>
              </div>
              <ProductGrid products={sortedProducts} />
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogoPage(props: Props) {
  return <CatalogoContent {...props} />;
}
