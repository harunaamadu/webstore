"use client";

import React from "react";
import { StaggerReveal } from "@/components/animations/reveal";
import SectionTitle from "@/components/common/sectionTitle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProductCard, ProductsEmpty, ProductsSkeleton } from "@/components/product";
import type { Product } from "@/types";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ProductLayoutProps {
  /** Section eyebrow label (e.g. "Top Picks") */
  eyebrow?: string;
  /** Section heading */
  title: string;
  /** Products to display */
  products: Product[];
  /** Whether data is still loading */
  loading?: boolean;
  /** Number of skeleton cards shown while loading */
  skeletonCount?: number;
  /** Link shown beside the section title */
  link?: { href: string; label: string };
  /**
   * Mobile breakpoint at which the carousel is used.
   * Below this value products render as a horizontal carousel;
   * at or above it a responsive grid is shown.
   * Uses Tailwind responsive prefix — defaults to "sm" (≥ 640 px).
   */
  breakpoint?: "sm" | "md";
  /**
   * Visible card width on mobile expressed as a Tailwind basis class.
   * Defaults to "basis-[72vw]" — roughly 1.4 cards visible at once.
   */
  mobileCardBasis?: string;
  /** Icon key passed to ProductsEmpty when there are no products */
  emptyIcon?: "history" | "bestsellers" | "default";
  /** Empty-state headline */
  emptyTitle?: string;
  /** Custom Tailwind grid class for the desktop grid */
  gridClassName?: string;
  /** Extra class applied to the wrapping <section> */
  className?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────

const ProductLayout = ({
  eyebrow,
  title,
  products,
  loading = false,
  skeletonCount = 8,
  link,
  breakpoint = "sm",
  mobileCardBasis = "basis-[72vw]",
  emptyIcon = "default",
  emptyTitle = "No products found",
  gridClassName = "grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5",
  className,
}: ProductLayoutProps) => {
  // Tailwind needs full class strings — derive the hide/show classes from
  // the chosen breakpoint so nothing gets purged.
  const hideBelow = breakpoint === "md" ? "md:hidden" : "sm:hidden";
  const showAbove = breakpoint === "md" ? "hidden md:block" : "hidden sm:block";

  const isEmpty = !loading && products.length === 0;

  return (
    <section className={`mx-auto w-full max-w-360 px-4 py-8 md:px-8 ${className ?? ""}`}>
      {/* Title — lives outside StaggerReveal so it animates independently */}
      <SectionTitle
        eyebrow={eyebrow}
        title={title}
        link={isEmpty ? undefined : link}
      />

      {/* ── Loading skeleton ──────────────────────────────────────────── */}
      {loading && (
        <ProductsSkeleton count={skeletonCount} className={gridClassName} />
      )}

      {/* ── Empty state ───────────────────────────────────────────────── */}
      {isEmpty && (
        <ProductsEmpty icon={emptyIcon} title={emptyTitle} />
      )}

      {/* ── Products ──────────────────────────────────────────────────── */}
      {!loading && products.length > 0 && (
        <>
          {/* Mobile: horizontal drag carousel */}
          <div className={hideBelow}>
            <Carousel opts={{ align: "start", dragFree: true }}>
              <CarouselContent className="-ml-3">
                {products.map((product, i) => (
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

          {/* Desktop: staggered grid */}
          <div className={showAbove}>
            <StaggerReveal
              stagger={0.08}
              variant="blur"
              direction="up"
              as="div"
              itemAs="div"
              className={gridClassName}
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
    </section>
  );
};

export default ProductLayout;