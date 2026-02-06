"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { collections } from "@/data/despensaNatural";
import { getProductsByCollection } from "@/data/despensaNatural";
import { useState, useEffect } from "react";

// ============================================
// CATEGORY SHOWCASE — Displays collections on the homepage
// ============================================
// This section automatically reads from data/collections.ts.
// To customize the layout, edit the grid below.

function useSynchronizedImageIndex(intervalMs: number = 4000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return index;
}

function CollectionCard({
  collection,
  index,
  globalImageIndex,
}: {
  collection: (typeof collections)[0];
  index: number;
  globalImageIndex: number;
}) {
  const products = getProductsByCollection(collection.slug);
  const allImages = products.flatMap((product) => product.images);
  const currentImageIndex = allImages.length > 0 ? globalImageIndex % allImages.length : 0;
  const displayImage = allImages[currentImageIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/categoria/${collection.slug}`}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4]">
          <AnimatePresence mode="wait">
            {displayImage ? (
              <motion.div
                key={displayImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={displayImage}
                  alt={collection.name}
                  fill
                  quality={95}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No image</span>
              </div>
            )}
          </AnimatePresence>

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="md:px-4 md:py-2 md:bg-black/30 md:backdrop-blur-[2px] md:rounded-lg">
              <h3 className="font-semibold text-white text-center text-sm md:text-lg tracking-wide" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {collection.name}
              </h3>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryShowcase() {
  const globalImageIndex = useSynchronizedImageIndex(7000);

  return (
    <section id="collection-showcase" className="relative pt-2 pb-8 sm:pt-3 sm:pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
              globalImageIndex={globalImageIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
