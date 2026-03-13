import type { Metadata } from "next";
import Image from "next/image";
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
    note: "Punto de retiro en Jardines de Carrasco (Ricardo Areco 7530).",
  },
  {
    method: "Envío Montevideo y alrededores",
    time: "Miércoles y viernes",
    price: "Mayor a $1000: gratis\nMenor a $1000: $80",
    note: "Envío gratis en compras mayores a $1000.",
  },
];

const policies = [
  {
    icon: Truck,
    title: "Días de envío",
    description:
      "Realizamos envíos los miércoles y viernes. Coordinamos el horario exacto por WhatsApp.",
  },
  {
    icon: Package,
    title: "Costo de envío",
    description:
      "Envío sin costo en compras mayores a $1000. En compras menores a $1000, el costo es de $80.",
  },
  {
    icon: MapPin,
    title: "Zona de cobertura",
    description:
      "Enviamos dentro de Montevideo y alrededores, según las zonas indicadas en el mapa de envíos.",
  },
  {
    icon: Clock,
    title: "Retiro",
    description:
      "También podés coordinar retiro en Jardines de Carrasco (Ricardo Areco 7530) escribiéndonos por WhatsApp.",
  },
];

export default function EnviosPage() {
  const mapUrl =
    "https://www.google.com/maps/d/u/0/viewer?hl=es&mid=10JPa-vk5603TAEtLW6l_4j62jq7ndkY&ll=-34.85978151803106%2C-56.06025847526988&z=12";

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Envíos
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Cómo recibir tu pedido. Retiro o envío en Montevideo y alrededores.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold font-display">Opciones de entrega</h2>
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
                      {opt.price.split("\n").map((line, index) => (
                        <p
                          key={index}
                          className={index === 0 ? undefined : "mt-0.5"}
                        >
                          {line}
                        </p>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold font-display">Información útil</h2>
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
          <h2 className="mb-4 text-2xl font-bold font-display">
            Ubicación y zonas de envío
          </h2>
          <p className="mb-4 text-gray-600">
            Podés coordinar el retiro de tu pedido por WhatsApp. El punto de
            retiro está en Jardines de Carrasco, en Ricardo Areco 7530.
          </p>
          <p className="mb-4 text-gray-600">
            Para las entregas a domicilio, consultá las zonas de envío en el{" "}
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-900 underline underline-offset-2 hover:no-underline"
            >
              mapa de envíos
            </a>{" "}
            interactivo.
          </p>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 inline-flex items-center gap-2 text-black font-medium underline hover:no-underline"
          >
            <MapPin className="h-4 w-4" />
            Ver zonas de envío en el mapa
          </a>
          <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <Image
              src="/envios/mapa-zonas-envio.jpg"
              alt="Mapa de zonas de envío de Despensa Natural en Montevideo y alrededores"
              fill
              className="h-full w-full object-cover"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
