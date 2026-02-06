import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

// Only import WaitlistForm when waitlist feature is enabled
const WaitlistForm = siteConfig.features.waitlist
  ? require("@/components/waitlist/WaitlistForm").WaitlistForm
  : null;

const footerLinks = siteConfig.footerNav;

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shop Links — only shown when store feature is enabled */}
          {siteConfig.features.store && (
            <div>
              <h3 className="font-semibold mb-4">Catálogo</h3>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-gray-600 hover:text-gray-900",
                        "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm",
                        "transition-colors"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm text-gray-600 hover:text-gray-900",
                      "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm",
                      "transition-colors"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter — only shown when waitlist feature is enabled */}
          {WaitlistForm && (
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">
                Suscribite para novedades y ofertas.
              </p>
              <WaitlistForm variant="inline" />
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
