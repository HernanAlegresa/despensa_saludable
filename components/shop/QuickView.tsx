"use client";

import { useState, useCallback } from "react";
import { ProductImage } from "@/components/ui/product-image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { cn } from "@/lib/utils";
import type { Product, Size, Color } from "@/lib/types/product";

interface QuickViewProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickView({ product, open, onOpenChange }: QuickViewProps) {
  const { addToCart } = useCart();
  const toast = useToast();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    product.colors[0] || null
  );

  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  const handleAddToCart = useCallback(() => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color");
      return;
    }
    addToCart(product, selectedSize, selectedColor, 1);
    toast.success(`${product.name} added to cart`);
    onOpenChange(false);
  }, [product, selectedSize, selectedColor, addToCart, toast, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200">
            <ProductImage
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 300px"
            />
            {hasDiscount && (
              <div className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                -{Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)}%
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold">{product.name}</h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xl font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.compareAtPrice!.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
                {product.description}
              </p>

              {/* Size Selection */}
              <div>
                <p className="mb-2 text-sm font-medium">
                  Size {selectedSize && `- ${selectedSize}`}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-9 w-10 rounded-md border text-sm font-medium transition-colors",
                        "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-900"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              {product.colors.length > 1 && (
                <div>
                  <p className="mb-2 text-sm font-medium">
                    Color {selectedColor && `- ${selectedColor.name}`}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "h-8 w-8 rounded-full border-2 transition-all",
                          "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
                          selectedColor?.name === color.name
                            ? "border-black ring-2 ring-black ring-offset-2"
                            : "border-gray-300 hover:border-gray-900"
                        )}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-2">
              {product.inStock ? (
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className="w-full"
                >
                  Add to Cart
                </Button>
              ) : (
                <p className="text-center text-sm font-medium text-red-600">
                  Out of Stock
                </p>
              )}
              <Link
                href={`/producto/${product.slug}`}
                onClick={() => onOpenChange(false)}
                className="block text-center text-sm text-gray-500 underline-offset-2 transition-colors hover:text-gray-900 hover:underline"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
