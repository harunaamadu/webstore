import BottomNav from "@/components/common/bottomNav";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Curated items for the modern lifestyle, household, offices & more",
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      {children}
    </main>
  );
}
