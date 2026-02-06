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

// Scroll threshold in pixels
const SCROLL_THRESHOLD = 50;

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // On non-homepage routes, always show the scrolled (solid) style
  const showSolidHeader = !isHomepage || isScrolled;

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
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          showSolidHeader
            ? "bg-white/70 backdrop-blur-sm border-gray-200"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                "text-3xl font-bold tracking-tight outline-none transition-colors duration-300 hover:opacity-80",
                showSolidHeader ? "text-black" : "text-white"
              )}
            >
              {siteConfig.name}
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Left Links */}
              {leftNavLinks.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-300 outline-none relative",
                      showSolidHeader
                        ? isActive
                          ? "text-black font-semibold"
                          : "text-gray-700 hover:text-black"
                        : isActive
                          ? "text-white font-semibold"
                          : "text-white/90 hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className={cn(
                        "absolute -bottom-1 left-0 right-0 h-0.5 rounded-full",
                        showSolidHeader ? "bg-black" : "bg-white"
                      )} />
                    )}
                  </Link>
                );
              })}

              {/* Search Icon - Centered and Highlighted with animation */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                className={cn(
                  "p-2 mx-4 outline-none transition-all duration-300 hover:scale-125 active:scale-95",
                  showSolidHeader
                    ? "text-black hover:text-gray-600"
                    : "text-white hover:text-white/80"
                )}
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

              {/* Right Links */}
              {rightNavLinks.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-300 outline-none relative",
                      showSolidHeader
                        ? isActive
                          ? "text-black font-semibold"
                          : "text-gray-700 hover:text-black"
                        : isActive
                          ? "text-white font-semibold"
                          : "text-white/90 hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className={cn(
                        "absolute -bottom-1 left-0 right-0 h-0.5 rounded-full",
                        showSolidHeader ? "bg-black" : "bg-white"
                      )} />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side: Cart + Mobile menu */}
            <div className="flex items-center gap-4">
              {/* Search Icon - Mobile/Tablet */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  "lg:hidden p-2 outline-none transition-colors duration-300",
                  showSolidHeader ? "text-black" : "text-white"
                )}
                aria-label="Search"
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
                <div className={cn(
                  "transition-colors duration-300",
                  showSolidHeader ? "text-black" : "text-white"
                )}>
                  <CartWidget />
                </div>
              )}

              {/* Mobile menu button */}
              <button
                className={cn(
                  "lg:hidden p-2 outline-none transition-colors duration-300",
                  showSolidHeader ? "text-black" : "text-white"
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
