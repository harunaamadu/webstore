"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/product/ProductCard";
import { mockProducts } from "@/data";
import type { Product } from "@/types";

// ─── Pick a curated set of ad products ────────────────────────────────────
// In production swap this for a real API / CMS fetch.

const AD_CATEGORIES: { label: string; category: string; discount: number }[] = [
  { label: "Vacuum cleaners", category: "home", discount: 20 },
  { label: "Xbox & Consoles", category: "toys", discount: 30 },
  { label: "Portable speakers", category: "electronics", discount: 30 },
  { label: "Laptops", category: "electronics", discount: 25 },
  { label: "Beauty Picks", category: "beauty", discount: 15 },
  { label: "Sports Gear", category: "sports", discount: 20 },
  { label: "Books", category: "books", discount: 40 },
  { label: "Auto Essentials", category: "automotive", discount: 23 },
];

function getAdProducts(): Product[] {
  return AD_CATEGORIES.map(({ category, discount }) => {
    const match =
      mockProducts.find(
        (p) =>
          p.category === category && (p.discountPercent ?? 0) >= discount - 5,
      ) ??
      mockProducts.find((p) => p.category === category) ??
      mockProducts[0];
    return match;
  });
}

// ─── AdProducts ────────────────────────────────────────────────────────────

const AdProducts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const products = useMemo(() => getAdProducts(), []);

  return (
    <section className="mx-auto w-full max-w-360 px-4 md:px-8 bg-primary/10">
      {/* Thin strip with nav arrows matching the design */}
      <div className="relative flex items-center py-6">
        {/* Prev arrow */}
        <button
          onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
          disabled={activeIndex === 0}
          aria-label="Scroll left"
          className="flex h-16 w-8 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
        >
          <CaretLeftIcon size={14} weight="bold" />
        </button>

        {/* Carousel */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <Carousel
            opts={{
              align: "start",
              dragFree: true,
              startIndex: activeIndex,
            }}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {products.map((product, index) => (
                <CarouselItem
                  key={product.id + index}
                  className="basis-auto md:basis-1/4 xl:basis-1/6 pl-0"
                  onClick={() => setActiveIndex(index)}
                >
                  <ProductCard
                    product={product}
                    variant="mini"
                    active={activeIndex === index}
                    className="max-w-55"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Next arrow */}
        <button
          onClick={() =>
            setActiveIndex((i) => Math.min(products.length - 1, i + 1))
          }
          disabled={activeIndex === products.length - 1}
          aria-label="Scroll right"
          className="flex h-16 w-8 shrink-0 items-center justify-center border-l border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
        >
          <CaretRightIcon size={14} weight="bold" />
        </button>
      </div>
    </section>
  );
};

export default AdProducts;
