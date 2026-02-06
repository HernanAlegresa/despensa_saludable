"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = siteConfig.mainNav;

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  // Check if a nav link is active
  const isLinkActive = (href: string) => {
    if (href === "/catalogo") {
      return pathname === "/catalogo" || pathname.startsWith("/categoria/");
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-white shadow-xl"
            aria-label="Mobile navigation"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b px-6 py-5">
                <span className="text-xl font-bold tracking-tight">
                  {siteConfig.name}
                </span>
                <button
                  onClick={onClose}
                  className="rounded-sm p-2 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 px-6 py-8">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => {
                    const isActive = isLinkActive(link.href);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.1 + index * 0.05,
                          duration: 0.3,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            "block rounded-md px-3 py-3 text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
                            isActive
                              ? "bg-black text-white"
                              : "text-gray-900 hover:bg-gray-50"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
