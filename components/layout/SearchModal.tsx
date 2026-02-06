"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { products } from "@/data/despensaNatural";
import { collections } from "@/data/despensaNatural";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchCategory = "all" | "products" | "collections" | "pages";

// Pages that can be searched
const pages = [
  { name: "Catálogo", href: "/catalogo", description: "Ver todos los productos" },
  { name: "Envíos", href: "/envios", description: "Información de envíos" },
  { name: "Contacto", href: "/contacto", description: "Escribinos" },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SearchCategory>("all");
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
      setQuery("");
      setCategory("all");
    }, 200);
  };

  const clearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  // Filter products based on query
  const filteredProducts = query
    ? products.filter((product) => {
        try {
          const searchLower = query.toLowerCase();
          const nameMatch = product.name?.toLowerCase().includes(searchLower) ?? false;
          const descMatch = product.description?.toLowerCase().includes(searchLower) ?? false;
          const categoryMatch = typeof product.category === "object"
            ? product.category?.name?.toLowerCase().includes(searchLower) ?? false
            : false;
          const collectionMatch = typeof product.collection === "object"
            ? product.collection?.name?.toLowerCase().includes(searchLower) ?? false
            : false;

          return nameMatch || descMatch || categoryMatch || collectionMatch;
        } catch {
          return false;
        }
      })
    : [];

  // Filter collections based on query
  const filteredCollections = query
    ? collections.filter((collection) => {
        try {
          const searchLower = query.toLowerCase();
          const nameMatch = collection.name?.toLowerCase().includes(searchLower) ?? false;
          const descMatch = collection.description?.toLowerCase().includes(searchLower) ?? false;
          return nameMatch || descMatch;
        } catch {
          return false;
        }
      })
    : [];

  // Filter pages based on query
  const filteredPages = query
    ? pages.filter((page) => {
        try {
          const searchLower = query.toLowerCase();
          const nameMatch = page.name?.toLowerCase().includes(searchLower) ?? false;
          const descMatch = page.description?.toLowerCase().includes(searchLower) ?? false;
          return nameMatch || descMatch;
        } catch {
          return false;
        }
      })
    : [];

  const showProducts = category === "all" || category === "products";
  const showCollections = category === "all" || category === "collections";
  const showPages = category === "all" || category === "pages";

  const hasResults =
    (showProducts && filteredProducts.length > 0) ||
    (showCollections && filteredCollections.length > 0) ||
    (showPages && filteredPages.length > 0);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] transition-all duration-300",
        isAnimating ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Search Container */}
      <div
        className={cn(
          "relative w-full max-w-3xl mx-auto mt-20 px-4 transition-all duration-300",
          isAnimating ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        )}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <svg
                className="w-6 h-6 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              {/* Search Input */}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, collections, pages..."
                className="flex-1 text-lg outline-none placeholder:text-gray-400"
              />

              {/* Clear Button - only shows when there's text */}
              {query && (
                <button
                  onClick={clearQuery}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Clear search"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 mt-4">
              {(["all", "products", "collections", "pages"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                    category === cat
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query === "" ? (
              // Empty State - Show popular searches
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-4">Popular searches</p>
                <div className="flex flex-wrap gap-2">
                  {["Shirts", "Outerwear", "Accessories", "Basics"].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : !hasResults ? (
              // No Results
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-900 font-medium">No results found</p>
                <p className="text-gray-500 text-sm mt-1">
                  Try searching for something else
                </p>
              </div>
            ) : (
              // Results
              <div className="p-4">
                {/* Products */}
                {showProducts && filteredProducts.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-3 px-2">Products</p>
                    <div className="space-y-1">
                      {filteredProducts.slice(0, 5).map((product) => {
                        const imageUrl = product.images?.[0] || "/placeholder.jpg";
                        const productName = product.name || "Product";
                        const productPrice = typeof product.price === "number" ? product.price.toFixed(2) : "0.00";
                        const productSlug = product.slug || product.id;

                        return (
                          <Link
                            key={product.id}
                            href={`/producto/${productSlug}`}
                            onClick={handleClose}
                            className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={imageUrl}
                                alt={productName}
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{productName}</p>
                              <p className="text-sm text-gray-500">
                                ${productPrice}
                              </p>
                            </div>
                            <svg
                              className="w-5 h-5 text-gray-400 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        );
                      })}
                    </div>
                    {filteredProducts.length > 5 && query && (
                      <Link
                        href={`/catalogo?q=${encodeURIComponent(query)}`}
                        onClick={handleClose}
                        className="block text-center text-sm text-black font-medium mt-3 hover:underline"
                      >
                        View all {filteredProducts.length} products →
                      </Link>
                    )}
                  </div>
                )}

                {/* Collections */}
                {showCollections && filteredCollections.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-3 px-2">Collections</p>
                    <div className="space-y-1">
                      {filteredCollections.map((collection) => {
                        const collectionSlug = collection.slug || "";
                        const collectionName = collection.name || "Collection";
                        const collectionDesc = collection.description || "";

                        return (
                          <Link
                            key={collectionSlug}
                            href={`/collections`}
                            onClick={handleClose}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{collectionName}</p>
                              <p className="text-sm text-gray-500">
                                {collectionDesc}
                              </p>
                            </div>
                            <svg
                              className="w-5 h-5 text-gray-400 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Pages */}
                {showPages && filteredPages.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-3 px-2">Pages</p>
                    <div className="space-y-1">
                      {filteredPages.map((page) => (
                        <Link
                          key={page.href}
                          href={page.href}
                          onClick={handleClose}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-5 h-5 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{page.name}</p>
                            <p className="text-sm text-gray-500">
                              {page.description}
                            </p>
                          </div>
                          <svg
                            className="w-5 h-5 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs">
                  ESC
                </kbd>
                to close
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
