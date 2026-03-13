"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-sm border-gray-200 font-header font-bold">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center">
            {/* Logo - left */}
            <div className="flex items-center min-w-0">
              <Link
                href="/"
                className="flex items-center gap-2 outline-none transition-opacity duration-300 hover:opacity-80"
              >
                <Image
                  src="/logo/logo_sinfondo.png"
                  alt="Despensa Natural — logo"
                  width={260}
                  height={50}
                  className="h-16 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Navigation - Desktop: centrada respecto al contenido */}
            <nav className="pointer-events-none absolute left-1/2 top-1/2 hidden w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 lg:grid grid-cols-[1fr_auto_1fr] items-center px-6">
              {/* Left: Catálogo, Envíos */}
              <div className="pointer-events-auto flex justify-end gap-10">
                {leftNavLinks.map((link) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-[0.95rem] font-medium transition-colors duration-300 outline-none relative text-black hover:text-black/80",
                        isActive && "font-semibold"
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-black" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Centro: lupa alineada con el eje del contenido */}
              <div className="flex justify-center px-6">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Buscar"
                  className="pointer-events-auto p-2 outline-none transition-all duration-300 hover:scale-125 active:scale-95 text-primary hover:text-primary/80"
                >
                  <svg
                    className="h-7 w-7 animate-pulse"
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
              </div>

              {/* Right: Contacto, Quiénes somos */}
              <div className="pointer-events-auto flex justify-start gap-10">
                {rightNavLinks.map((link) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-[0.95rem] font-medium transition-colors duration-300 outline-none relative text-black hover:text-black/80",
                        isActive && "font-semibold"
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-black" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Right side: Cart + Mobile menu */}
            <div className="ml-auto flex items-center justify-end gap-4">
              {/* Search Icon - Mobile/Tablet */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  "lg:hidden p-2 outline-none transition-colors duration-300 text-primary"
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
                <div className="transition-colors duration-300 text-primary">
                  <CartWidget />
                </div>
              )}

              {/* Mobile menu button */}
              <button
                className={cn(
                  "lg:hidden p-2 outline-none transition-colors duration-300 text-primary"
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
