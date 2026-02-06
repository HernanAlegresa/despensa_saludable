import type { Metadata } from "next";
import { MessageCircle, Mail, MapPin, Instagram } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contactá a ${siteConfig.name} por WhatsApp, Instagram o email.`,
};

const contactInfo = [
  ...(siteConfig.social.whatsapp
    ? [
        {
          icon: MessageCircle,
          label: "WhatsApp",
          value: "Escribinos para pedidos y consultas",
          href: siteConfig.social.whatsapp,
        },
      ]
    : []),
  ...(siteConfig.social.instagram
    ? [
        {
          icon: Instagram,
          label: "Instagram",
          value: "@despensanatural",
          href: siteConfig.social.instagram,
        },
      ]
    : []),
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: siteConfig.location,
    href: null,
  },
];

export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Contacto
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Escribinos por WhatsApp o Instagram para pedidos y consultas.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-gray-200 p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-gray-500">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-1 block font-medium text-black underline hover:no-underline"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 font-medium">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        <section className="mt-16 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Formas de pago</h2>
          <p className="text-gray-600">
            Información solo a título informativo. Una vez que envías tu pedido
            por WhatsApp, te confirmamos el total y las opciones de pago
            disponibles (transferencia, efectivo u otras según coordinación).
          </p>
        </section>
      </div>
    </div>
  );
}
