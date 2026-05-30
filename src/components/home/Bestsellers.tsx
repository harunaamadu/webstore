"use client";

import React, { useEffect, useState } from "react";

import { StaggerReveal } from "../animations/reveal";
import SectionTitle from "../common/sectionTitle";
import {
  ProductCard,
  ProductsEmpty,
  ProductsSkeleton,
} from "@/components/product";
import type { Product } from "@/types";
import { mockProducts } from "@/data";

// ─── Config ────────────────────────────────────────────────────────────────

const titleData = {
  eyebrow: "Top Picks",
  title: "Bestsellers",
  link: {
    href: "/shop/bestsellers",
    label: "View All",
  },
};

// ─── Bestsellers ───────────────────────────────────────────────────────────

const Bestsellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(
        mockProducts.filter((p) => p.badge === "best-seller").slice(0, 8),
      );
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const isEmpty = !loading && products.length === 0;

  return (
    <div className="mx-auto w-full max-w-360 px-4 py-8 md:px-8">
      {/* Title lives outside StaggerReveal — not a stagger child */}
      <SectionTitle
        eyebrow={titleData.eyebrow}
        title={titleData.title}
        link={isEmpty ? undefined : titleData.link}
      />

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <ProductsSkeleton count={8} />
        </div>
      ) : products.length === 0 ? (
        <ProductsEmpty icon="bestsellers" title="No bestsellers yet" />
      ) : (
        <StaggerReveal
          stagger={0.08}
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
    </div>
  );
};

export default Bestsellers;
