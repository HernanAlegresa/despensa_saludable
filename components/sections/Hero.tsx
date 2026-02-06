"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const HERO_IMAGE = "/hero/pedrosk-118.jpg";

export function Hero() {
  return (
    <section id="hero" className="relative w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full min-h-[60vh] md:min-h-[70vh] overflow-hidden"
      >
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
    </section>
  );
}
