"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ProductImage } from "@/components/ui/product-image";
import type { Product } from "@/lib/types/product";
import { cn } from "@/lib/utils";

interface CompleteTheLookProps {
  products: Product[];
  currentProductId: string;
}

export function CompleteTheLook({
  products,
  currentProductId,
}: CompleteTheLookProps) {
  const relatedProducts = useMemo(
    () => products.filter((p) => p.id !== currentProductId).slice(0, 4),
    [products, currentProductId]
  );

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-16 border-t">
      <h2 className="text-2xl font-bold mb-8">También te puede interesar</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/producto/${product.slug}`}
              className={cn(
                "group block",
                "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-lg"
              )}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-2">
                <ProductImage
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
              <h3 className="font-medium text-sm text-gray-900 group-hover:text-gray-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm font-semibold mt-1">
                ${product.price.toFixed(2)}
              </p>
            </Link>
        ))}
      </div>
    </section>
  );
}
