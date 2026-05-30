"use client";

import React, { useEffect, useState } from "react";
import ProductLayout from "@/components/product/ProductLayout";
import type { Product } from "@/types";
import { mockProducts } from "@/data";

const Bestsellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(
        mockProducts.filter((p) => p.badge === "best-seller").slice(0, 8)
      );
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ProductLayout
      eyebrow="Top Picks"
      title="Bestsellers"
      products={products}
      loading={loading}
      skeletonCount={8}
      link={{ href: "/shop/bestsellers", label: "View All" }}
      emptyIcon="bestsellers"
      emptyTitle="No bestsellers yet"
    />
  );
};

export default Bestsellers;