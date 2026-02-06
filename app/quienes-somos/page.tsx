import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description: `Conocé la historia y los valores de ${siteConfig.name}. Alimentos reales, ingredientes simples.`,
};

export default function QuienesSomosPage() {
  return (
    <article className="bg-white">
      {/* Hero — imagen full-bleed sin texto */}
      <header className="relative w-full min-h-[75vh] md:min-h-[85vh] overflow-hidden">
        <Image
          src="/quienes-somos/hero.jpg"
          alt=""
          fill
          className="object-cover object-[center_5%]"
          priority
          sizes="100vw"
        />
      </header>

      {/* Image + Story */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 order-2 lg:order-1">
              <Image
                src="/quienes-somos/nuestra-historia.jpeg"
                alt="Despensa Natural — nuestra historia"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Nuestra historia
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Somos dos virgos que nos hacemos los saludables y queremos vender productos a precios que te arrancan la cabeza. Aparte que estan todos procesados por la guchi. El cabe no la pone ni en remojo y pepo se va a kenia a hacerse el sobrio, y se manda un octavito todos los dias.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Osea la verdad, arrancamos con este negocio para camuflar que vendemos coqui. Queremos agradecer a Rafa que se la juega y nos hace precio para brindarle el mejor servicio a nuestros clientes y que pegue pa arriba.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed image break */}
      <section className="relative h-[280px] sm:h-[360px] lg:h-[420px]">
        <Image
          src="/hero/pedrosk-118.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* Values + Image */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Mascotas:
              </h2>
              <ul className="mt-6 space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-medium">
                    1
                  </span>
                  <span className="leading-relaxed">
                    <strong className="text-gray-900">Berto:</strong>{" "}
                    The summer main man, 220 pounds, con arriba de 8 noches gratis, previa, asado y todo.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-medium">
                    2
                  </span>
                  <span className="leading-relaxed">
                    <strong className="text-gray-900">Tato:</strong>{" "}
                    Productazo, roba vapo de santa y toca el bajo como jack el destripador.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-medium">
                    3
                  </span>
                  <span className="leading-relaxed">
                    <strong className="text-gray-900">2026 mascota draft 1st pick:</strong>{" "}
                    Una incógnita, pero con el 1st pick de 2026, cabe va a buscar su extremo derecho para el ataque y formar con los 3 de arriba.
                  </span>
                </li>
              </ul>
            </div>
<div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src="/quienes-somos/que-nos-guia.jpeg"
                alt="Despensa Natural — qué nos guía"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Cierre */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Tu despensa, más natural
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Recorré nuestro catálogo, elegí lo que te guste y escribinos por
            WhatsApp para armar tu pedido. Estamos para ayudarte.
          </p>
          <p className="mt-6">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Ver catálogo
            </Link>
          </p>
        </div>
      </section>
    </article>
  );
}
