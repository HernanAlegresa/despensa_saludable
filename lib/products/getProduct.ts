import { products, getProductBySlug } from "@/data/despensaNatural";
import type { Product } from "@/lib/types/product";

export async function getProduct(slug: string): Promise<Product | null> {
  // Simulate async operation
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = getProductBySlug(slug);
      resolve(product || null);
    }, 0);
  });
}

export async function getAllProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 0);
  });
}

export function getRelatedProducts(
  currentProduct: Product,
  limit: number = 4
): Product[] {
  return products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        product.category.id === currentProduct.category.id
    )
    .slice(0, limit);
}
