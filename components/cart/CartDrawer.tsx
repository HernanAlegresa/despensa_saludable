"use client";

import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { ProductImage } from "@/components/ui/product-image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "@/config/site";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FREE_SHIPPING_THRESHOLD = 1000;

function buildWhatsAppMessage(cart: { items: { product: { name: string; price: number }; size: string; color: { name: string }; quantity: number }[]; total: number }): string {
  const lines = ["Hola! Me gustaría hacer un pedido:", ""];
  cart.items.forEach((item) => {
    const lineTotal = item.product.price * item.quantity;
    lines.push(`- ${item.product.name} (${item.size} · ${item.color.name}) x ${item.quantity} — $${lineTotal}`);
  });
  lines.push("", `Total: $${cart.total}`);
  return lines.join("\n");
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cart.total);
  const shippingProgress = Math.min(100, (cart.total / FREE_SHIPPING_THRESHOLD) * 100);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      // Focus close button when drawer opens
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      // Return focus to previous element
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    const drawer = drawerRef.current;
    const focusableElements = drawer.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    drawer.addEventListener("keydown", handleTabKey);
    return () => drawer.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  // Determine if items list should scroll (more than 4 items)
  const shouldScroll = cart.items.length > 4;

  // Use portal to render at document root level
  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - solid dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-[9998]"
            style={{ backdropFilter: "blur(4px)" }}
            aria-hidden="true"
          />

          {/* Drawer - solid white background */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-[28rem] z-[9999] shadow-2xl flex flex-col"
            style={{ backgroundColor: "#ffffff" }}
            role="dialog"
            aria-modal="true"
            aria-label="Tu pedido"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold">Tu pedido</h2>
                {cart.items.length > 0 && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {cart.items.length} {cart.items.length === 1 ? "producto" : "productos"}
                  </p>
                )}
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className={cn(
                  "p-2 rounded-full hover:bg-gray-100 transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                )}
                aria-label="Cerrar pedido"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {cart.items.length > 0 && (
              <div className="border-b px-6 py-3">
                <div className="mb-1.5 text-xs text-center">
                  {amountToFreeShipping > 0 ? (
                    <span className="text-gray-600">
                      Sumá <span className="font-semibold text-black">${amountToFreeShipping.toFixed(0)}</span> más para envío sin costo
                    </span>
                  ) : (
                    <span className="font-medium text-green-600">
                      ¡Llegaste al envío sin costo!
                    </span>
                  )}
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    className="h-full rounded-full bg-black"
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items - scrollable only when more than 4 items */}
            <div
              className={cn(
                "bg-white",
                shouldScroll ? "flex-1 overflow-y-auto" : "flex-shrink-0"
              )}
              style={shouldScroll ? { maxHeight: "calc(100vh - 380px)" } : undefined}
            >
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center px-6 bg-white">
                  <ShoppingBag className="h-20 w-20 text-gray-200 mb-6" />
                  <p className="text-xl font-semibold text-gray-900 mb-2">
                    Tu pedido está vacío
                  </p>
                  <p className="text-gray-500 mb-8">
                    Agregá productos para empezar
                  </p>
                  <Link href="/catalogo" onClick={onClose}>
                    <Button size="lg">Ver catálogo</Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 bg-white">
                  {cart.items.map((item) => {
                    const itemTotal = item.product.price * item.quantity;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="p-5 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <Link
                            href={`/producto/${item.product.slug}`}
                            onClick={onClose}
                            className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                          >
                            <ProductImage
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              sizes="96px"
                            />
                          </Link>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0 flex flex-col">
                            {/* Name and Remove */}
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                href={`/producto/${item.product.slug}`}
                                onClick={onClose}
                                className="hover:underline"
                              >
                                <h3 className="font-semibold text-gray-900 leading-tight text-sm">
                                  {item.product.name}
                                </h3>
                              </Link>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className={cn(
                                  "p-1 -m-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors",
                                  "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
                                )}
                                aria-label={`Quitar ${item.product.name} del pedido`}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Variant info */}
                            <p className="text-xs text-gray-500 mt-1">
                              {item.size} · {item.color.name}
                            </p>

                            {/* Price and Quantity - bottom row */}
                            <div className="flex items-center justify-between mt-auto pt-2">
                              {/* Quantity Controls */}
                              <div className="flex items-center border border-gray-200 rounded-md bg-white">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className={cn(
                                    "p-1.5 hover:bg-gray-100 transition-colors rounded-l-md",
                                    "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                                  )}
                                  aria-label="Menos cantidad"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="px-3 py-1 text-sm font-medium min-w-[2.5rem] text-center border-x border-gray-200">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className={cn(
                                    "p-1.5 hover:bg-gray-100 transition-colors rounded-r-md",
                                    "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                                  )}
                                  aria-label="Más cantidad"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              {/* Item Total */}
                              <p className="text-sm font-semibold text-gray-900">
                                ${itemTotal.toFixed(0)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer - Order Summary - always visible, solid background */}
            {cart.items.length > 0 && (
              <div className="flex-shrink-0 border-t border-gray-200 p-5 space-y-3" style={{ backgroundColor: "#f9fafb" }}>
                {/* Summary Lines */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({cart.items.length} {cart.items.length === 1 ? "producto" : "productos"})</span>
                    <span className="font-medium text-gray-900">${cart.total.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium">
                      {amountToFreeShipping <= 0 ? (
                        <span className="text-green-600">Sin costo</span>
                      ) : (
                        <span className="text-gray-600">$80</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">${cart.total.toFixed(0)}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  {siteConfig.social.whatsapp ? (
                    <Button className="w-full h-11 text-base font-semibold" size="lg" asChild>
                      <a
                        href={`${siteConfig.social.whatsapp}?text=${encodeURIComponent(buildWhatsAppMessage(cart))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                      >
                        Enviar por WhatsApp
                      </a>
                    </Button>
                  ) : (
                    <Button className="w-full h-11 text-base font-semibold" size="lg" disabled>
                      Enviar por WhatsApp (configurar número)
                    </Button>
                  )}
                  <Link href="/catalogo" onClick={onClose} className="block">
                    <Button variant="outline" className="w-full h-10">
                      Seguir comprando
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Render via portal to ensure proper layering above everything
  if (!mounted) {
    return null;
  }

  return createPortal(drawerContent, document.body);
}
