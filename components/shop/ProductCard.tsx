"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ProductImage } from "@/components/ui/product-image";
import { Check } from "lucide-react";
import type { Product } from "@/lib/types/product";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

function formatWeight(sizes: string[]): string {
  if (!sizes.length) return "";
  return sizes.join(" · ");
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const hasSecondImage = product.images.length > 1;
  const weightText = formatWeight(product.sizes);

  useEffect(() => {
    if (hasSecondImage) {
      const img = new Image();
      img.src = product.images[1];
    }
  }, [product.images, hasSecondImage]);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!product.inStock || !product.sizes.length) return;
      addToCart(product, product.sizes[0] as any, product.colors[0], 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    },
    [product, addToCart]
  );

  const displayImage = isHovered && hasSecondImage ? product.images[1] : product.images[0];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image area: link layer + button overlay on bottom */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-3">
        <Link
          href={`/producto/${product.slug}`}
          className="absolute inset-0 z-0 block"
          aria-label={product.name}
        >
          <ProductImage
            src={displayImage}
            alt={product.name}
            fill
            quality={95}
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
              -{Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)}%
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Sin stock
              </span>
            </div>
          )}
        </Link>

        {/* Add to cart: overlaid at bottom of image; mobile always visible, desktop on hover */}
        {product.inStock && product.sizes.length > 0 && (
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 z-10 p-2 transition-all duration-200 ease-out",
              "max-md:opacity-100",
              isHovered ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:translate-y-2"
            )}
          >
            <button
              type="button"
              onClick={handleAddToCart}
              className={cn(
                "w-full py-2 rounded-lg text-sm font-medium transition-colors shadow-lg",
                "bg-gray-900 text-white hover:bg-gray-800",
                "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900",
                added && "bg-green-700 hover:bg-green-700"
              )}
            >
              {added ? (
                <span className="inline-flex items-center justify-center gap-1.5">
                  <Check className="h-4 w-4" /> Agregado
                </span>
              ) : (
                "Agregar al carrito"
              )}
            </button>
          </div>
        )}
      </div>

      <Link href={`/producto/${product.slug}`} className="group block">
        <h3 className="font-medium text-gray-900 text-sm leading-tight">
          {product.name}
        </h3>
      </Link>

      {weightText && (
        <p className="text-xs text-gray-500 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis" title={weightText}>
          {weightText}
        </p>
      )}

      <div className="flex items-baseline gap-2 mt-0.5">
        <span className="font-semibold text-gray-900 text-sm">
          ${product.price.toFixed(2)}
        </span>
        {hasDiscount && (
          <span className="text-xs text-gray-500 line-through">
            ${product.compareAtPrice!.toFixed(0)}
          </span>
        )}
      </div>
    </div>
  );
}
