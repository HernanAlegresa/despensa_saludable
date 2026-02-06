import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { BrandStory } from "@/components/sections/BrandStory";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Inicio",
  description: siteConfig.description,
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoryShowcase />
      <BrandStory />
    </>
  );
}
