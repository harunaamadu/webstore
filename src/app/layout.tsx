import type { Metadata } from "next";
import { Geist_Mono, Lato, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers/providers";
import { ScrollToTopButton } from "@/components/common";

const lato = Lato({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webstore.vercel.app"),
  title: {
    default: "Webstore - Modern Fashion",
    template: "%s | Webstore",
  },
  description:
    "Curated items for the modern lifestyle, household, offices & more",
  keywords: [
    "ecommerce",
    "online shopping",
    "amazon-style store",
    "marketplace",
    "webstore",
    "fashion ecommerce",
    "electronics store",
    "gadgets",
    "smart devices",
    "home decor",
    "furniture",
    "kitchen essentials",
    "beauty products",
    "health products",
    "groceries online",
    "toys",
    "gaming accessories",
    "mobile phones",
    "laptops",
    "streetwear",
    "modern fashion",
    "men fashion",
    "women fashion",
    "kids fashion",
    "luxury fashion",
    "trendy outfits",
    "sneakers",
    "bags and accessories",
    "buy clothes online",
    "discount deals",
    "daily deals",
    "best sellers",
    "affordable products",
    "premium products",
    "fast delivery",
    "secure checkout",
    "shopping cart",
    "online marketplace",
    "multi-vendor store",
    "digital shopping",
    "lifestyle products",
    "smart shopping",
    "fashion and tech",
    "home essentials",
    "modern lifestyle",
    "exclusive offers",
    "shop online",
    "global marketplace",
  ],
  authors: [{ name: "Haruna Amadu" }],
  creator: "Haruna Amadu",
  publisher: "Haruna Amadu",
  robots: { index: true, follow: true },
  category: "ecommerce",
  openGraph: {
    title: "Webstore – Modern Multi-Vendor E-Commerce Marketplace",
    description:
      "Shop electronics, fashion, gadgets, home essentials, beauty products, toys, and exclusive deals at Webstore — your all-in-one online shopping destination.",
    url: "https://webstore.vercel.app",
    siteName: "Webstore",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Webstore online marketplace banner",
      },
      {
        url: "/images/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Webstore premium e-commerce shopping experience",
      },
    ],
    locale: "en_US",
    type: "website",
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
      className={cn(
        "h-full scroll-smooth",
        "antialiased",
        "font-sans",
        lato.variable,
        geistMono.variable,
        montserrat.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
