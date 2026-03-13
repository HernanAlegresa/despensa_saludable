import type { Metadata } from "next";
import { MessageCircle, Mail, MapPin, Instagram } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contactá a ${siteConfig.name} por WhatsApp, Instagram o email.`,
};

export default function ContactoPage() {
  const whatsappUrl = siteConfig.social.whatsapp || "#";
  const instagramUrl = siteConfig.social.instagram || "#";

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Contacto
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Escribinos por WhatsApp o Instagram para pedidos, consultas y
            coordinación de envíos o retiro.
          </p>
        </div>

        {/* Fila 1: contactos principales */}
        <section className="mb-10">
          <div className="grid gap-6 md:grid-cols-2">
            {/* WhatsApp */}
            <div className="flex h-full flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                  <MessageCircle className="h-5 w-5 text-green-700" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  WhatsApp
                </p>
                <p className="mt-1 text-base font-medium text-gray-900">
                  Pedidos y consultas
                </p>
                <p className="mt-1 text-sm text-gray-600 break-words">
                  099 426 168
                </p>
              </div>
              <div className="mt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Escribir por WhatsApp
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex h-full flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-pink-50">
                  <Instagram className="h-5 w-5 text-pink-600" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Instagram
                </p>
                <p className="mt-1 text-base font-medium text-gray-900">
                  @despensanaturaluy
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Novedades, productos y contenido del día a día.
                </p>
              </div>
              <div className="mt-4">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Ver Instagram
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Fila 2: información secundaria */}
        <section className="mb-12">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Email */}
            <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <Mail className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Email
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-1 text-sm font-medium text-gray-900 underline underline-offset-2 hover:no-underline break-words"
              >
                {siteConfig.email}
              </a>
              <p className="mt-2 text-sm text-gray-600">
                Ideal para consultas más detalladas o documentación.
              </p>
            </div>

            {/* Ubicación */}
            <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <MapPin className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Ubicación
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                Jardines de Carrasco
              </p>
              <p className="text-sm text-gray-600">Ricardo Areco 7530</p>
              <p className="mt-2 text-sm text-gray-600">
                Coordinamos día y horario de retiro por WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* Formas de pago */}
        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-3 text-xl font-bold font-display">Formas de pago</h2>
          <p className="mb-4 text-sm text-gray-600">
            Elegí la opción que te quede más cómoda al momento de confirmar tu
            pedido.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-medium text-gray-900">
                Transferencia bancaria
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Cuenta Itaú{" "}
                <span className="font-mono font-semibold">3171900</span>.
              </p>
            </div>
            <div className="rounded-md bg-white p-4">
              <p className="text-sm font-medium text-gray-900">Efectivo</p>
              <p className="mt-1 text-sm text-gray-600">
                Al momento de retirar o recibir tu pedido.
              </p>
            </div>
          </div>
          <p className="pt-3 text-xs text-gray-500">
            Una vez que nos envíes tu pedido por WhatsApp, te confirmamos el
            total y los datos para el pago.
          </p>
        </section>
      </div>
    </div>
  );
}
