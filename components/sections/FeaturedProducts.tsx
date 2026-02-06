import { getFeaturedProducts } from "@/data/despensaNatural";
import { ProductCard } from "@/components/shop/ProductCard";

// ============================================
// FEATURED PRODUCTS — Shows products marked as featured
// ============================================
// This reads from data/products.ts and displays items where
// featured: true. Change the title or limit as needed.

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts().slice(0, 4);

  return (
    <section id="featured" className="relative pt-4 pb-2 sm:pt-6 sm:pb-3 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Featured
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
