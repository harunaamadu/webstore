"use client";

import React, { useEffect, useState } from "react";
import ProductLayout from "@/components/product/ProductLayout";
import type { Product } from "@/types";
import { mockProducts } from "@/data";

const RecentlyViewed = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching recently viewed from storage / API
    const timer = setTimeout(() => {
      setProducts(mockProducts.slice(-4));
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ProductLayout
      eyebrow="History"
      title="Recently Viewed"
      products={products}
      loading={loading}
      skeletonCount={4}
      link={{ href: "/shop/history", label: "View All" }}
      emptyIcon="history"
      emptyTitle="Nothing viewed yet"
      mobileCardBasis="basis-[72vw]"
    />
  );
};

export default RecentlyViewed;