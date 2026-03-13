"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { collections } from "@/data/despensaNatural";
import { getProductsByCollection } from "@/data/despensaNatural";

// ============================================
// CATEGORY SHOWCASE — Displays collections on the homepage
// ============================================
// Layout: 1 full-width (multi-image) + 4 + 2 wide + 4 = 11 categories
// Category images are static (no automatic rotation/transition).

// Full-width card showing multiple product images from one category
function FullWidthCollectionCard({
  collection,
}: {
  collection: (typeof collections)[0];
}) {
  const products = getProductsByCollection(collection.slug);
  const allImages = products.flatMap((p) => p.images);
  const displayImages = allImages.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/categoria/${collection.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[21/9] min-h-[140px] sm:min-h-[180px]">
          <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-4">
            {displayImages.length > 0 ? (
              displayImages.map((src, i) => (
                <div key={i} className="relative overflow-hidden">
                  <Image
                    src={src}
                    alt=""
                    fill
                    quality={90}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
              ))
            ) : (
              <div className="col-span-2 sm:col-span-4 absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No image</span>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="px-4 py-2 bg-black/30 backdrop-blur-[2px] rounded-lg">
              <h3
                className="font-semibold text-white text-center text-base sm:text-lg md:text-xl tracking-wide"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
              >
                {collection.name}
              </h3>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CollectionCard({
  collection,
  index,
  className,
  wide = false,
}: {
  collection: (typeof collections)[0];
  index: number;
  className?: string;
  wide?: boolean;
}) {
  const products = getProductsByCollection(collection.slug);
  const allImages = products.flatMap((product) => product.images);
  const displayImage = allImages.length > 0 ? allImages[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={className}
    >
      <Link
        href={`/categoria/${collection.slug}`}
        className="group block"
      >
        <div
          className={`relative overflow-hidden rounded-xl bg-gray-100 ${
            wide ? "aspect-[2/1] md:aspect-[16/9]" : "aspect-[3/4]"
          }`}
        >
          {displayImage ? (
            <Image
              src={displayImage}
              alt={collection.name}
              fill
              quality={95}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="md:px-4 md:py-2 md:bg-black/30 md:backdrop-blur-[2px] md:rounded-lg">
              <h3
                className="font-semibold text-white text-center text-sm md:text-lg tracking-wide"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
              >
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
  const [row1, row2, row3, row4] = [
    collections[0],
    collections.slice(1, 5),
    collections.slice(5, 7),
    collections.slice(7, 11),
  ];

  return (
    <section id="collection-showcase" className="relative border-0 pt-4 pb-8 sm:pt-6 sm:pb-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Nuestras categorías de productos
          </h2>
        </div>

        {/* Row 1: 1 full-width card with multiple product images */}
        <div className="mb-3 md:mb-4">
          <FullWidthCollectionCard collection={row1} />
        </div>

        {/* Row 2: 4 standard cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-3 md:mb-4">
          {row2.map((collection, i) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={i}
            />
          ))}
        </div>

        {/* Row 3: 2 wide (half-width) cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
          {row3.map((collection, i) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={i}
              wide
            />
          ))}
        </div>

        {/* Row 4: 4 standard cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {row4.map((collection, i) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
