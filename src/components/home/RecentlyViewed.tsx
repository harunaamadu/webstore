"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClockCounterClockwiseIcon } from "@phosphor-icons/react";

import { StaggerReveal } from "../animations/reveal";
import SectionTitle from "../common/sectionTitle";
import type { Product } from "@/types";
import { mockProducts } from "@/data";
import {
  ProductCard,
  ProductsEmpty,
  ProductsSkeleton,
} from "@/components/product";

// ─── Config ────────────────────────────────────────────────────────────────

const titleData = {
  eyebrow: "History",
  title: "Recently Viewed",
  link: {
    href: "/shop/history",
    label: "View All",
  },
};

// ─── RecentlyViewed ────────────────────────────────────────────────────────

const RecentlyViewed = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching recently viewed from storage/API
    const timer = setTimeout(() => {
      // Use last 4 mock products as stand-in for real history
      setProducts(mockProducts.slice(-4));
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mx-auto w-full max-w-360 px-4 py-8 md:px-8">
      {/* Title sits outside StaggerReveal so it animates independently */}
      <SectionTitle
        eyebrow={titleData.eyebrow}
        title={titleData.title}
        link={titleData.link}
      />

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <ProductsSkeleton count={8} />
        </div>
      ) : products.length === 0 ? (
        <ProductsEmpty icon="bestsellers" title="No bestsellers yet" />
      ) : (
        <StaggerReveal
          stagger={0.1}
          variant="blur"
          direction="up"
          as="div"
          itemAs="div"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variant="default" />
          ))}
        </StaggerReveal>
      )}
    </section>
  );
};

export default RecentlyViewed;
