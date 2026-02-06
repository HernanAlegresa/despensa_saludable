"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

const LIFESTYLE_IMAGE = "/brand/pedrosk-85.jpg";

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
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <Image
              src={LIFESTYLE_IMAGE}
              alt="Despensa Natural — alimentos naturales"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 text-lg leading-relaxed text-gray-600"
            >
              Menos microplasticos.
              <br />
              Más popa.
              <br />
              <br />
              Hola, si queres un matesito de estos te doy. Ta medio lavadito ya.
              <br />
              <br />
              En la bolsitas de carne desecada, tenemos coqui! Te llevas unas buenas lemon orange, bien sati pa tomar unos matesi y quedar re loli!
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
