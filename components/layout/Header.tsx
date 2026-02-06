"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchModal } from "@/components/layout/SearchModal";
import { siteConfig } from "@/config/site";

// Only import CartWidget when store feature is enabled
const CartWidget = siteConfig.features.store
  ? require("@/components/cart/CartWidget").CartWidget
  : null;

// Split nav items for desktop layout (left/right of center search)
const navItems = siteConfig.mainNav;
const midpoint = Math.ceil(navItems.length / 2);
const leftNavLinks = navItems.slice(0, midpoint);
const rightNavLinks = navItems.slice(midpoint);

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Check if a nav link is active
  const isLinkActive = (href: string) => {
    if (href === "/catalogo") {
      return pathname === "/catalogo" || pathname.startsWith("/categoria/");
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b bg-white/70 backdrop-blur-sm border-gray-200"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center">
            {/* Logo - left */}
            <div className="flex-1 flex items-center min-w-0">
              <Link
                href="/"
                className="text-xl font-bold tracking-tight outline-none transition-colors duration-300 hover:opacity-80 truncate text-black"
              >
                {siteConfig.name}
              </Link>
            </div>

            {/* Navigation - Desktop: Catálogo + Envíos | Lupa | Contacto + Quiénes somos */}
            <nav className="hidden lg:flex items-center justify-center gap-8 flex-shrink-0">
              {/* Left: Catálogo, Envíos */}
              {leftNavLinks.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-300 outline-none relative",
                      isActive
                          ? "text-black font-semibold"
                          : "text-gray-700 hover:text-black"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-black" />
                    )}
                  </Link>
                );
              })}

              {/* Search Icon — centro, con efecto de pulso */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Buscar"
                className="p-2 mx-4 outline-none transition-all duration-300 hover:scale-125 active:scale-95 text-black hover:text-gray-600"
              >
                <svg
                  className="w-7 h-7 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Right: Contacto, Quiénes somos */}
              {rightNavLinks.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-300 outline-none relative",
                      isActive
                          ? "text-black font-semibold"
                          : "text-gray-700 hover:text-black"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-black" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side: Cart + Mobile menu - same width as left for balance */}
            <div className="flex-1 flex items-center justify-end gap-4">
              {/* Search Icon - Mobile/Tablet */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  "lg:hidden p-2 outline-none transition-colors duration-300 text-black"
                )}
                aria-label="Buscar"
              >
                <svg
                  className="w-5 h-5"
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
              </button>

              {CartWidget && (
                <div className="transition-colors duration-300 text-black">
                  <CartWidget />
                </div>
              )}

              {/* Mobile menu button */}
              <button
                className={cn(
                  "lg:hidden p-2 outline-none transition-colors duration-300 text-black"
                )}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
