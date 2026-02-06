import type { Metadata } from "next";
import { Truck, Package, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Envíos",
  description: `Cómo recibir tu pedido de ${siteConfig.name}. Retiro y envío en Montevideo y alrededores.`,
};

const deliveryOptions = [
  {
    method: "Retiro en punto",
    time: "Coordinado por WhatsApp",
    price: "Sin costo",
    note: "Consultá horarios y dirección por WhatsApp.",
  },
  {
    method: "Envío Montevideo",
    time: "24–48 h hábiles",
    price: "Consultar",
    note: "Zonas cubiertas según disponibilidad.",
  },
  {
    method: "Envío interior",
    time: "A coordinar",
    price: "Consultar",
    note: "Consultar por tu localidad.",
  },
];

const policies = [
  {
    icon: Truck,
    title: "Retiro y envío",
    description:
      "Coordinamos retiro en punto o envío por Montevideo y alrededores. Escribinos por WhatsApp para confirmar zona y costo.",
  },
  {
    icon: Package,
    title: "Embalaje",
    description:
      "Productos envasados con cuidado. Pedidos listos en 24–48 h hábiles una vez confirmado.",
  },
  {
    icon: MapPin,
    title: "Zona de cobertura",
    description:
      "Montevideo y zona metropolitana. Para otras localidades consultá por WhatsApp.",
  },
  {
    icon: Clock,
    title: "Horarios",
    description:
      "Atención por WhatsApp en horario laboral. Los pedidos se preparan de lunes a viernes.",
  },
];

export default function EnviosPage() {
  const mapUrl = "https://www.google.com/maps"; // Reemplazar con link real si aplica

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Envíos
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Cómo recibir tu pedido. Retiro o envío en Montevideo y alrededores.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Opciones de entrega</h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold sm:px-6">
                    Método
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold sm:px-6">
                    Plazo
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold sm:px-6">
                    Costo
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {deliveryOptions.map((opt) => (
                  <tr key={opt.method}>
                    <td className="px-4 py-4 sm:px-6">
                      <p className="font-medium">{opt.method}</p>
                      {opt.note && (
                        <p className="mt-0.5 text-sm text-gray-500">
                          {opt.note}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">
                      {opt.time}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium sm:px-6">
                      {opt.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Información útil</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {policies.map((policy) => (
              <div
                key={policy.title}
                className="rounded-lg border border-gray-200 p-6"
              >
                <policy.icon className="mb-3 h-6 w-6" strokeWidth={1.5} />
                <h3 className="mb-2 text-lg font-semibold">{policy.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {policy.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Ubicación</h2>
          <p className="text-gray-600 mb-4">
            {siteConfig.location}. Consultá dirección exacta de retiro por
            WhatsApp.
          </p>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-black font-medium underline hover:no-underline"
          >
            <MapPin className="h-4 w-4" />
            Ver en mapa
          </a>
        </section>
      </div>
    </div>
  );
}
