import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { MessageCircle, Mail, MapPin, Instagram } from "lucide-react";

// Enlace del desarrollador
const DEVELOPER_URL = "https://www.linkedin.com/in/hernán-alegresa-methol-url";
const DEVELOPER_NAME = "Hernán Alegresa";

export function Footer() {
  const navLinks = [
    ...siteConfig.footerNav.shop,
    ...siteConfig.footerNav.company,
  ];

  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* Bloques principales */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {/* Bloque 1: Marca */}
          <div className="flex items-center">
            <Link
              href="/"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
            >
              <Image
                src="/logo/logo_sinfondo.png"
                alt={siteConfig.name}
                width={260}
                height={50}
                className="h-30 w-auto text-black"
              />
            </Link>
          </div>

          {/* Bloque 2: Navegación */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              Navegación
            </h3>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloque 3: Contacto */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3">
              {siteConfig.social.whatsapp && (
                <li>
                  <a
                    href={siteConfig.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white rounded"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    WhatsApp
                  </a>
                </li>
              )}
              {siteConfig.social.instagram && (
                <li>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white rounded"
                  >
                    <Instagram className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    Instagram
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white rounded"
                >
                  <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  {siteConfig.email}
                </a>
              </li>
              {siteConfig.location && (
                <li className="inline-flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>{siteConfig.location}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Franja inferior */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center">
            <p className="text-sm text-gray-600 sm:mx-auto">
              © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-500 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 sm:text-right">
              Sitio desarrollado por{" "}
              <a
                href={DEVELOPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-900 hover:decoration-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 rounded"
              >
                {DEVELOPER_NAME}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
