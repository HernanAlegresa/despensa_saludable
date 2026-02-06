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

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [addedSize, setAddedSize] = useState<string | null>(null);
  const { addToCart } = useCart();

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const hasSecondImage = product.images.length > 1;

  // Preload second image for instant swap
  useEffect(() => {
    if (hasSecondImage) {
      const img = new Image();
      img.src = product.images[1];
    }
  }, [product.images, hasSecondImage]);

  // Handle quick add to cart with feedback
  const handleQuickAdd = useCallback((e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.colors[0];
    addToCart(product, size as any, defaultColor, 1);
    setAddedSize(size);
    setTimeout(() => setAddedSize(null), 1000);
  }, [product, addToCart]);

  // Simple hover swap: main image → second image
  const displayImage = isHovered && hasSecondImage ? product.images[1] : product.images[0];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/producto/${product.slug}`}
        className="group block"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-3">
          {/* Image - instant swap on hover */}
          <ProductImage
            src={displayImage}
            alt={product.name}
            fill
            quality={95}
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />

          {/* Discount badge */}
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
              -{Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)}%
            </div>
          )}

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Sin stock
              </span>
            </div>
          )}

          {/* Quick size selector */}
          {product.inStock && isHovered && (
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-white/95">
              <div className="flex justify-center gap-0.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleQuickAdd(e, size)}
                    className={cn(
                      "w-8 h-7 text-xs font-medium transition-all",
                      addedSize === size
                        ? "bg-black text-white"
                        : "hover:bg-black hover:text-white"
                    )}
                  >
                    {addedSize === size ? <Check className="h-3 w-3 mx-auto" /> : size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-0.5">
          <h3 className="font-medium text-gray-900 text-sm leading-tight">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
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
      </Link>
    </div>
  );
}
