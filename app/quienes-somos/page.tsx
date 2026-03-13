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
      <header className="relative w-full min-h-[70vh] md:min-h-[70vh] overflow-hidden">
        <Image
          src="/quienes-somos/hero-equipo.jpg"
          alt="Equipo de Despensa Natural preparando productos naturales"
          fill
          className="object-cover object-[center_40%]"
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
                className="object-cover object-[center_15%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl font-display">
                Nuestra historia
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Despensa Natural nace con una idea simple: acercar alimentos
                reales, de calidad y sin ultraprocesados a la mesa de todos los
                días.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Creemos en los productos naturales, en el trabajo de pequeños
                productores y en volver a una forma de alimentarnos más
                consciente. Por eso seleccionamos cuidadosamente cada producto
                que ofrecemos, priorizando ingredientes simples, procesos
                artesanales y alimentos que realmente aporten valor a tu
                alimentación.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Nuestro objetivo es que comprar alimentos naturales sea fácil,
                accesible y confiable. Por eso creamos una despensa online donde
                podés recorrer el catálogo, elegir lo que te gusta y hacer tu
                pedido de forma simple a través de WhatsApp.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Despensa Natural es un proyecto cercano, construido con
                dedicación y con la intención de ofrecer una alternativa
                saludable para el día a día.
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
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl font-display">
                Nuestra forma de trabajar
              </h2>
              <ul className="mt-6 space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-medium">
                    1
                  </span>
                  <span className="leading-relaxed">
                    <strong className="text-gray-900">
                      Selección de productos
                    </strong>
                    : Elegimos cuidadosamente cada producto del catálogo,
                    priorizando alimentos naturales, de buena calidad y
                    elaborados con ingredientes simples.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-medium">
                    2
                  </span>
                  <span className="leading-relaxed">
                    <strong className="text-gray-900">Compra simple</strong>:{" "}
                    Queremos que comprar sea fácil. Podés recorrer el catálogo,
                    elegir tus productos y enviarnos tu pedido directamente por
                    WhatsApp.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-medium">
                    3
                  </span>
                  <span className="leading-relaxed">
                    <strong className="text-gray-900">
                      Cercanía con el cliente
                    </strong>
                    : Buscamos mantener un trato directo y cercano, ayudando a
                    cada cliente a encontrar los productos que mejor se adapten
                    a su día a día.
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src="/quienes-somos/nuestra-forma-de-trabajar.jpg"
                alt="Despensa Natural — selección y preparación de alimentos naturales"
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
