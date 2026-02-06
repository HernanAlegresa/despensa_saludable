import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Productos naturales sin ultraprocesados.",
};

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
