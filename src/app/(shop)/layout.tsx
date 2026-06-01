import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Home",
    template: "%s | Webstore",
  },
  description:
    "Curated items for the modern lifestyle, household, offices & more",
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-full flex flex-col">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
