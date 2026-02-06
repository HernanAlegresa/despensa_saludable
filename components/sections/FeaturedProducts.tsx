import { getFeaturedProducts } from "@/data/despensaNatural";
import { ProductCard } from "@/components/shop/ProductCard";

// ============================================
// PRODUCTOS MÁS PEDIDOS — Most requested / most popular products
// ============================================
// Uses featured products from catalog; displays 8 items.

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts().slice(0, 8);

  return (
    <section id="featured" className="relative pt-4 pb-2 sm:pt-6 sm:pb-3 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Productos más pedidos
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
