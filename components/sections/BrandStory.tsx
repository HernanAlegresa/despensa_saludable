"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

// ============================================
// BRAND STORY SECTION — Edit copy for your brand
// ============================================
// This section appears on the homepage below featured products.
// Customize the heading, body text, and CTA link.
// Replace the gradient placeholder with a lifestyle image.

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="brand-story" ref={sectionRef} className="overflow-hidden bg-gray-50 py-8 sm:py-10">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image with parallax */}
          <motion.div
            style={{ y: imageY }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300"
          >
            <div className="flex h-full items-center justify-center text-gray-400">
              <span className="text-sm">Imagen de estilo de vida</span>
            </div>
          </motion.div>

          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-gray-500"
            >
              Nuestra filosofía
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Menos ruido.
              <br />
              Más sustancia.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-4 text-lg leading-relaxed text-gray-600"
            >
              Creemos que los mejores productos no necesitan gritar. Ingredientes
              simples, sin ultraprocesados, con el cuidado que se nota.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 text-lg leading-relaxed text-gray-600"
            >
              Materia prima de calidad, procesos transparentes y un compromiso
              con lo natural que se siente desde el primer bocado.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-600"
              >
                Contacto
                <ArrowRight className="h-4 w-4" />
              </Link>
              {siteConfig.social.whatsapp && (
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-600"
                >
                  WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
