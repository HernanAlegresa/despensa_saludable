// ============================================
// SITE CONFIGURATION — Despensa Natural
// ============================================

export const siteConfig = {
  // ── Brand ──────────────────────────────────────
  name: "Despensa Natural",
  shortName: "Despensa Natural",
  description:
    "Alimentos reales sin ultraprocesados, con ingredientes simples y naturales.",
  tagline:
    "Alimentos reales sin ultraprocesados, con ingredientes simples y naturales.",

  // ── URLs ───────────────────────────────────────
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  ogImage: "/og-image.png",

  // ── Contact ────────────────────────────────────
  email: "hola@despensanatural.com",
  location: "Montevideo, Uruguay",
  responseTime: "En el día",

  // ── Social Links (set to "" to hide) ───────────
  social: {
    twitter: "",
    instagram: "https://instagram.com/despensanatural",
    github: "",
    linkedin: "",
    whatsapp: "https://wa.me/59899123456",
  },

  // ── Navigation ─────────────────────────────────
  mainNav: [
    { href: "/catalogo", label: "Catálogo" },
    { href: "/envios", label: "Envíos" },
    { href: "/contacto", label: "Contacto" },
    { href: "/quienes-somos", label: "Quiénes somos" },
  ],

  footerNav: {
    shop: [{ href: "/catalogo", label: "Catálogo" }],
    company: [
      { href: "/envios", label: "Envíos" },
      { href: "/contacto", label: "Contacto" },
      { href: "/quienes-somos", label: "Quiénes somos" },
    ],
  },

  // ── SEO / Metadata ─────────────────────────────
  keywords: [
    "despensa natural",
    "alimentos naturales",
    "granola",
    "miel",
    "frutos secos",
    "snacks saludables",
    "Uruguay",
  ],
  authors: [{ name: "Despensa Natural" }],
  locale: "es_UY",

  // ── Announcement Bar ───────────────────────────
  announcement: "", // vacío = no se muestra la barra (antes: "Envíos en Montevideo...")

  // ── Feature Flags ──────────────────────────────
  features: {
    store: true,
    waitlist: false,
    portfolio: false,
  },

  // ── Store Settings ─────────────────────────────
  currency: "UYU",
  currencySymbol: "$",
} as const;

// Type helper for consuming the config
export type SiteConfig = typeof siteConfig;
