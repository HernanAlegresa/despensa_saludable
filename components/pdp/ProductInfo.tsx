"use client";

import { useState, useCallback } from "react";
import type { Product, Color } from "@/lib/types/product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart } = useCart();
  const toast = useToast();
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    product.colors[0] || null
  );

  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const weightText = product.sizes.length > 0 ? product.sizes.join(" · ") : "";

  const handleColorSelect = useCallback((color: Color) => {
    setSelectedColor(color);
  }, []);

  const handleAddToCart = useCallback(() => {
    const color = selectedColor || product.colors[0];
    const size = product.sizes[0];
    if (!size || !color) {
      toast.error("No se puede agregar al carrito");
      return;
    }
    if (!product.inStock) {
      window.dispatchEvent(new CustomEvent("open-waitlist-modal"));
      return;
    }
    addToCart(product, size, color, 1);
    toast.success(`${product.name} agregado al carrito`);
  }, [product, selectedColor, addToCart, toast]);

  return (
    <div className="space-y-6">
      {/* Title and Price */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl font-semibold">
            ${product.price.toFixed(0)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xl text-gray-500 line-through">
                ${product.compareAtPrice!.toFixed(0)}
              </span>
              <span className="text-sm font-medium text-red-600">
                Ahorrás ${(product.compareAtPrice! - product.price).toFixed(0)}
              </span>
            </>
          )}
        </div>
        {!product.inStock && (
          <p className="text-sm font-medium text-red-600">Sin stock</p>
        )}
      </div>

      {/* Description */}
      <div>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Weight (plain text only) */}
      {weightText && (
        <p className="text-sm text-gray-600">{weightText}</p>
      )}

      {/* Color Selection */}
      {product.colors.length > 1 && (
        <div>
          <label className="block text-sm font-medium mb-3">
            Color {selectedColor && `- ${selectedColor.name}`}
          </label>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => {
              const isSelected = selectedColor?.name === color.name;
              return (
                <button
                  key={color.name}
                  onClick={() => handleColorSelect(color)}
                  disabled={!product.inStock}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
                    isSelected
                      ? "border-black ring-2 ring-black ring-offset-2"
                      : "border-gray-300 hover:border-gray-900",
                    !product.inStock && "opacity-50 cursor-not-allowed"
                  )}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Elegir variante ${color.name}`}
                  aria-pressed={isSelected}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Add to Cart / Waitlist */}
      <div className="space-y-3 pt-4">
        {product.inStock ? (
          <Button
            onClick={handleAddToCart}
            className="w-full"
            size="lg"
          >
            Agregar al carrito
          </Button>
        ) : (
          <Button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-waitlist-modal"));
            }}
            variant="outline"
            className="w-full"
            size="lg"
          >
            Avisame cuando haya stock
          </Button>
        )}
      </div>

      {/* Product Details */}
      <div className="pt-6 border-t space-y-2 text-sm">
        <div className="flex">
          <span className="font-medium w-24">Categoría:</span>
          <span className="text-gray-600 capitalize">
            {product.category.name}
          </span>
        </div>
        <div className="flex">
          <span className="font-medium w-24">Código:</span>
          <span className="text-gray-600">{product.id}</span>
        </div>
      </div>
    </div>
  );
}
