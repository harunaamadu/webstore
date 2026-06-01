"use client";

import React from "react";
import { StaggerReveal } from "@/components/animations/reveal";
import SectionTitle from "@/components/common/sectionTitle";
import ProductCard from "@/components/product/ProductCard";
import { ProductsSkeleton, ProductsEmpty, type EmptyStatePreset } from "./ProductStates";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { Product } from "@/types";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface ProductLayoutProps {
  eyebrow?: string;
  title: string;
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
  link?: { href: string; label: string };
  /**
   * Mobile breakpoint below which the carousel is used instead of the grid.
   * Defaults to "sm" (< 640 px).
   */
  breakpoint?: "sm" | "md";
  /**
   * Tailwind basis class controlling how wide each card is in the mobile carousel.
   * Defaults to "basis-[72vw]" — roughly 1.4 cards visible.
   */
  mobileCardBasis?: string;
  emptyIcon?: EmptyStatePreset;
  emptyTitle?: string;
  emptyDescription?: string;
  columns?: 2 | 4 | 5;
  stagger?: number;
}

// ─── Column class map ───────────────────────────────────────────────────────

export const colClass: Record<NonNullable<ProductLayoutProps["columns"]>, string> = {
  2: "md:grid-cols-2",
  4: "md:grid-cols-2 lg:grid-cols-4",
  5: "md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5",
};

// ─── ProductLayout ──────────────────────────────────────────────────────────

const ProductLayout = ({
  eyebrow,
  title,
  products,
  loading = false,
  skeletonCount = 5,
  link,
  breakpoint = "sm",
  mobileCardBasis = "basis-[72vw]",
  emptyIcon = "default",
  emptyTitle = "No products found",
  emptyDescription = "Check back soon.",
  columns = 5,
  stagger = 0.08,
}: ProductLayoutProps) => {
  const isEmpty = !loading && products.length === 0;

  // Tailwind needs full strings — derive show/hide classes from breakpoint
  // so the purge scanner sees them as complete class names.
  const hideOnMobile = breakpoint === "md" ? "md:hidden"     : "sm:hidden";
  const showOnDesktop = breakpoint === "md" ? "hidden md:block" : "hidden sm:block";

  return (
    <div className="mx-auto w-full max-w-360 px-4 py-8 md:px-8">
      {/* Title — always outside StaggerReveal */}
      <SectionTitle
        eyebrow={eyebrow}
        title={`${title}${!loading && products.length > 0 ? ` (${products.length})` : ""}`}
        link={isEmpty ? undefined : link}
      />

      {/* ── Loading ──────────────────────────────────────────────────────── */}
      {loading && (
        <ProductsSkeleton
          count={skeletonCount}
          className={`grid gap-4 ${colClass[columns]}`}
        />
      )}

      {/* ── Empty ────────────────────────────────────────────────────────── */}
      {isEmpty && (
        <ProductsEmpty
          icon={emptyIcon}
          title={emptyTitle}
          description={emptyDescription}
        />
      )}

      {/* ── Products ─────────────────────────────────────────────────────── */}
      {!loading && products.length > 0 && (
        <>
          {/* Mobile — horizontal drag carousel */}
          <div className={hideOnMobile}>
            <Carousel opts={{ align: "start", dragFree: true }}>
              <CarouselContent className="-ml-3">
                {products.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className={`pl-3 ${mobileCardBasis}`}
                  >
                    <ProductCard product={product} variant="default" />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Desktop — staggered grid */}
          <div className={showOnDesktop}>
            <StaggerReveal
              stagger={stagger}
              variant="blur"
              direction="up"
              as="div"
              itemAs="div"
              className={`grid gap-4 ${colClass[columns]}`}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="default"
                />
              ))}
            </StaggerReveal>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductLayout;