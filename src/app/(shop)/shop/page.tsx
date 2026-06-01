import type { Metadata } from "next";
import { ProductGrid } from "@/components/product";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Curated items for the modern lifestyle, household, offices & more",
};

const Page = () => {
  return (
    <ProductGrid
      titleType="breadcrumb"
      title="Shop"
      eyebrow="Browse"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Shop" },
      ]}
    />
  );
};

export default Page;