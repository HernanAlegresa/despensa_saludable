import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getCategoryBySlug,
  getProductsByCategory,
} from "@/data/despensaNatural";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return { title: "Categoría no encontrada" };
  }
  return {
    title: category.name,
    description: category.description ?? `Productos en ${category.name}.`,
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <div className="container mx-auto px-4 pt-20 pb-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Catálogo", href: "/catalogo" },
          { label: category.name },
        ]}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-gray-600">{category.description}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          {products.length} producto{products.length !== 1 ? "s" : ""}
        </p>
      </div>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="py-12 text-center">
          <p className="text-gray-600">No hay productos en esta categoría.</p>
          <Link
            href="/catalogo"
            className="mt-4 inline-block text-black font-medium underline"
          >
            Ver catálogo
          </Link>
        </div>
      )}
    </div>
  );
}
