import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { BackToTop } from "@/components/ui/back-to-top";
// import { PreviewBanner } from "@/components/layout/PreviewBanner"; // Uncomment if you need a preview/coming-soon popup
import { siteConfig } from "@/config/site";

const onest = localFont({
  src: "../public/fonts/Onest-Regular.ttf",
  variable: "--font-sans",
  display: "swap",
});

const cooper = localFont({
  src: "../public/fonts/CooperLtBT-Regular.ttf",
  variable: "--font-display",
  display: "swap",
});

const justMe = localFont({
  src: "../public/fonts/JustMeAgainDownHere-Regular.ttf",
  variable: "--font-hand",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-header",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${onest.variable} ${cooper.variable} ${justMe.variable} ${inter.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <CartProvider>
          <ToastProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-black focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to content
            </a>
            <AnnouncementBar />
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
