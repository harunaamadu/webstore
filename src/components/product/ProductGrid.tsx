"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SquaresFourIcon,
  ListIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  XIcon,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerReveal } from "@/components/animations/reveal";
import SectionTitle from "@/components/common/sectionTitle";

import ProductCard from "./ProductCard";
import { mockProducts } from "@/data";
import type {
  Product,
  ProductCategory,
  ProductGridFilters,
  SortOption,
} from "@/types";

// ─── Constants ─────────────────────────────────────────────────────────────

export const CATEGORIES: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home", label: "Home" },
  { value: "beauty", label: "Beauty" },
  { value: "sports", label: "Sports" },
  { value: "toys", label: "Toys" },
  { value: "books", label: "Books" },
  { value: "automotive", label: "Automotive" },
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export const PRICE_RANGES = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25–$100", min: 25, max: 100 },
  { label: "$100–$300", min: 100, max: 300 },
  { label: "$300+", min: 300, max: Infinity },
];

// ─── Sort util ─────────────────────────────────────────────────────────────

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  switch (sort) {
    case "price-asc":
      return [...products].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...products].sort((a, b) => b.price - a.price);
    case "rating":
      return [...products].sort(
        (a, b) =>
          b.review.rating - a.review.rating ||
          b.review.count - a.review.count
      );
    case "newest":
      return [...products].reverse();
    default:
      return products;
  }
}

// ─── ActiveFilter chip ──────────────────────────────────────────────────────

export const FilterChip = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) => (
  <motion.button
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    onClick={onRemove}
    className="flex items-center gap-1 border border-primary/30 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary transition-colors hover:bg-primary/10"
  >
    {label}
    <XIcon size={9} weight="bold" />
  </motion.button>
);

// ─── ProductGrid ────────────────────────────────────────────────────────────

export interface ProductGridProps {
  title?: string;
  eyebrow?: string;
  products?: Product[];
  defaultCategory?: ProductCategory | "all";
  showFilters?: boolean;
  showLayoutToggle?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}

const ProductGrid = ({
  title = "Products",
  eyebrow = "Shop",
  products = mockProducts,
  defaultCategory = "all",
  showFilters = true,
  showLayoutToggle = true,
  columns = 4,
  className,
}: ProductGridProps) => {
  const [category, setCategory] = useState<ProductCategory | "all">(
    defaultCategory
  );
  const [sort, setSort] = useState<SortOption>("featured");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Apply filters + sort
  const filtered = useMemo(() => {
    let result = products;

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }
    if (priceRange) {
      result = result.filter(
        (p) =>
          p.price >= priceRange.min &&
          (priceRange.max === Infinity || p.price <= priceRange.max)
      );
    }
    if (onlyFreeShipping) {
      result = result.filter((p) => p.freeShipping);
    }
    if (onlyInStock) {
      result = result.filter((p) => p.inStock);
    }

    return sortProducts(result, sort);
  }, [products, category, sort, priceRange, onlyFreeShipping, onlyInStock]);

  // Active filter chips
  const activeFilters: { label: string; clear: () => void }[] = [];
  if (category !== "all") {
    activeFilters.push({
      label: CATEGORIES.find((c) => c.value === category)?.label ?? category,
      clear: () => setCategory("all"),
    });
  }
  if (priceRange) {
    activeFilters.push({
      label:
        PRICE_RANGES.find(
          (r) => r.min === priceRange.min && r.max === priceRange.max
        )?.label ?? "Price filter",
      clear: () => setPriceRange(null),
    });
  }
  if (onlyFreeShipping) {
    activeFilters.push({
      label: "Free Shipping",
      clear: () => setOnlyFreeShipping(false),
    });
  }
  if (onlyInStock) {
    activeFilters.push({
      label: "In Stock",
      clear: () => setOnlyInStock(false),
    });
  }

  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns];

  return (
    <section className={cn("mx-auto w-full max-w-360 px-4 py-8 md:px-8", className)}>
      {/* Header */}
      <SectionTitle
        eyebrow={eyebrow}
        title={title}
        link={{ href: "/shop", label: "View all" }}
      />

      {/* Category tabs */}
      <div className="mb-4 flex flex-wrap gap-1.5 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={cn(
              "shrink-0 border px-3 py-1.5 text-xs font-medium transition-all",
              category === cat.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Filter toggle (mobile / collapsible) */}
          {showFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFiltersOpen((o) => !o)}
              className={cn(filtersOpen && "border-primary bg-primary/5")}
            >
              <FunnelIcon size={13} weight={filtersOpen ? "fill" : "regular"} />
              Filters
              {activeFilters.length > 0 && (
                <span className="ml-1 flex size-4 items-center justify-center bg-primary text-[9px] font-bold text-primary-foreground">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          )}

          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            results
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-7 border border-border bg-background px-2 text-xs text-foreground outline-none focus:border-primary"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Layout toggle */}
          {showLayoutToggle && (
            <div className="flex border border-border">
              <button
                onClick={() => setLayout("grid")}
                className={cn(
                  "flex size-7 items-center justify-center transition-colors",
                  layout === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                <SquaresFourIcon size={14} />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={cn(
                  "flex size-7 items-center justify-center transition-colors",
                  layout === "list"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                <ListIcon size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="mb-4 grid grid-cols-2 gap-6 border border-border bg-muted/30 p-4 sm:grid-cols-3 lg:grid-cols-4">
              {/* Price range */}
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Price
                </p>
                <div className="flex flex-col gap-1">
                  {PRICE_RANGES.map((r) => (
                    <button
                      key={r.label}
                      onClick={() =>
                        setPriceRange(
                          priceRange?.min === r.min && priceRange?.max === r.max
                            ? null
                            : { min: r.min, max: r.max }
                        )
                      }
                      className={cn(
                        "text-left text-xs transition-colors",
                        priceRange?.min === r.min && priceRange?.max === r.max
                          ? "font-semibold text-primary"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Availability
                </p>
                <div className="flex flex-col gap-1.5">
                  <label className="flex cursor-pointer items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="size-3 accent-primary"
                    />
                    In Stock Only
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={onlyFreeShipping}
                      onChange={(e) => setOnlyFreeShipping(e.target.checked)}
                      className="size-3 accent-primary"
                    />
                    Free Shipping
                  </label>
                </div>
              </div>

              {/* Clear all */}
              {activeFilters.length > 0 && (
                <div className="flex items-end sm:col-span-1 lg:col-start-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCategory("all");
                      setPriceRange(null);
                      setOnlyFreeShipping(false);
                      setOnlyInStock(false);
                    }}
                    className="text-muted-foreground"
                  >
                    <XIcon size={12} />
                    Clear all
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active filter chips */}
      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mb-4 flex flex-wrap gap-2"
          >
            {activeFilters.map((f) => (
              <FilterChip key={f.label} label={f.label} onRemove={f.clear} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid / List */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-60 flex-col items-center justify-center gap-3 border border-dashed border-border"
          >
            <p className="text-sm font-medium text-muted-foreground">
              No products match your filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCategory("all");
                setPriceRange(null);
                setOnlyFreeShipping(false);
                setOnlyInStock(false);
              }}
            >
              Clear filters
            </Button>
          </motion.div>
        ) : layout === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn("grid gap-4", colClass)}
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.4) }}
              >
                <ProductCard product={product} variant="default" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3) }}
              >
                <ProductCard product={product} variant="horizontal" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductGrid;