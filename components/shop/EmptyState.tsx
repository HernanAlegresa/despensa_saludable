import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h2 className="text-2xl font-semibold mb-2">No hay productos</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        No encontramos productos con esos filtros. Probá cambiando la búsqueda o los filtros.
      </p>
      <Link href="/catalogo">
        <Button variant="outline">Limpiar filtros</Button>
      </Link>
    </div>
  );
}
