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

function ShopContent({ searchParams }: Props) {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ShopPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ShopPageContent({ searchParams }: Props) {
  const params = await searchParams;
  const searchQuery = params.q || "";
  const sortOption = (params.sort as SortOption) || "relevance";

  // Parse filters from URL
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) urlParams.set(key, value);
  });
  const filters = parseFiltersFromSearchParams(urlParams);

  // Get and filter products
  const allProducts = getAllProducts();
  const filteredProducts = filterProducts(allProducts, filters, searchQuery);
  const sortedProducts = sortProducts(filteredProducts, sortOption, searchQuery);

  return (
    <div className="container mx-auto px-4 pt-20 pb-8">
      {/* Mobile Filter Trigger */}
      <div className="mb-4 md:hidden">
        <MobileFilterTrigger resultCount={sortedProducts.length} />
      </div>

      {/* Filter Chips */}
      <div className="mb-6">
        <FilterChips />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden md:block">
          <FilterPanel />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {sortedProducts.length > 0 ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <SortDropdown />
                <span className="text-sm text-gray-600">
                  Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
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

export default function ShopPage(props: Props) {
  return <ShopContent {...props} />;
}
