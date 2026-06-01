"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  LightningIcon,
  SealCheckIcon,
  TruckIcon,
  EyeIcon,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import DiscountBadge from "./DiscountBadge";

import { useCartStore } from "@/store/cart.store";

// ─── Badge config ──────────────────────────────────────────────────────────

export const BADGE_CONFIG: Record<
  NonNullable<Product["badge"]>,
  { label: string; className: string }
> = {
  "best-seller": {
    label: "Best Seller",
    className: "bg-amber-100 text-amber-800 border-amber-200",
  },
  new: {
    label: "New",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  sale: {
    label: "Sale",
    className: "bg-rose-100 text-rose-700 border-rose-200",
  },
  limited: {
    label: "Limited",
    className: "bg-purple-100 text-purple-800 border-purple-200",
  },
  prime: {
    label: "Prime",
    className: "bg-primary/10 text-primary-foreground border-primary/20",
  },
  hot: {
    label: "🔥 Hot",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
};

// ─── Star Rating ───────────────────────────────────────────────────────────

const StarRating = ({
  rating,
  count,
  compact = false,
}: {
  rating: number;
  count: number;
  compact?: boolean;
}) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            size={compact ? 11 : 12}
            weight={
              i < full ? "fill" : i === full && half ? "duotone" : "regular"
            }
            className={
              i < full || (i === full && half)
                ? "text-amber-400"
                : "text-neutral-300"
            }
          />
        ))}
      </div>
      <span className="text-[10px] text-muted-foreground tabular-nums">
        ({count.toLocaleString()})
      </span>
    </div>
  );
};

// ─── ProductCard ───────────────────────────────────────────────────────────

export interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "horizontal" | "mini";
  active?: boolean;
  onAddToCart?: (product: Product) => void;
  onWishlist?: (product: Product) => void;
  className?: string;
}

const ProductCard = ({
  product,
  variant = "default",
  active = false,
  onAddToCart,
  onWishlist,
  className,
}: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(product.isWishlisted ?? false);
  const [addedToCart, setAddedToCart] = useState(false);

  const badge = product.badge ? BADGE_CONFIG[product.badge] : null;

  const addItem = useCartStore((s) => s.addItem);

  const cartItem = useCartStore((s) =>
    s.items.find((item) => item.product.id === product.id),
  );

  const quantityInCart = cartItem?.quantity ?? 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(product);

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);

    onAddToCart?.(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((v) => !v);
    onWishlist?.(product);
  };

  // ── Horizontal variant ─────────────────────────────────────────────────
  if (variant === "horizontal") {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "group relative flex gap-4 bg-background p-4 transition-all hover:border hover:border-border hover:shadow-md",
          className,
        )}
      >
        <Link href={`/products/${product.id}`} className="shrink-0">
          <div className="relative size-28 overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="112px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              {badge && (
                <span
                  className={cn(
                    "mb-1 inline-flex items-center border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider",
                    badge.className,
                  )}
                >
                  {badge.label}
                </span>
              )}
              <Link href={`/products/${product.id}`}>
                <p className="text-[10px] font-medium text-muted-foreground">
                  {product.brand}
                </p>
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground hover:text-primary">
                  {product.name}
                </h3>
              </Link>
            </div>
            <button
              onClick={handleWishlist}
              className="shrink-0 text-neutral-400 transition-colors hover:text-rose-500"
            >
              <HeartIcon
                size={16}
                weight={wishlisted ? "fill" : "regular"}
                className={wishlisted ? "text-rose-500" : ""}
              />
            </button>
          </div>

          <StarRating
            rating={product.review.rating}
            count={product.review.count}
          />

          <div className="flex items-baseline gap-2">
            <span className="text-base font-black text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discountPercent && (
              <span className="text-xs font-semibold text-rose-600">
                -{product.discountPercent}%
              </span>
            )}
          </div>

          {product.freeShipping && (
            <div className="flex items-center gap-1 text-[10px] text-emerald-700">
              <TruckIcon size={11} weight="fill" />
              Free delivery
            </div>
          )}

          <Button
            size="sm"
            onClick={handleAddToCart}
            className="mt-auto w-fit"
            disabled={!product.inStock}
          >
            <ShoppingCartIcon size={13} />
            {quantityInCart > 0
              ? `${quantityInCart} in Cart`
              : addedToCart
                ? "Added!"
                : product.inStock
                  ? "Add to Cart"
                  : "Out of Stock"}
          </Button>
        </div>
      </motion.div>
    );
  }

  // ── Compact variant ────────────────────────────────────────────────────
  if (variant === "compact") {
    return (
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "group relative bg-background transition-all hover:border hover:border-border hover:shadow-md",
          className,
        )}
      >
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {badge && (
              <span
                className={cn(
                  "absolute left-2 top-2 border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider",
                  badge.className,
                )}
              >
                {badge.label}
              </span>
            )}
            <button
              onClick={handleWishlist}
              className="absolute right-2 top-2 flex size-7 items-center justify-center border border-border bg-background/90 text-neutral-400 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:text-red-500"
            >
              <HeartIcon
                size={14}
                weight={wishlisted ? "fill" : "regular"}
                className={wishlisted ? "text-red-500" : ""}
              />
            </button>
          </div>

          <div className="p-2.5">
            <p className="truncate text-xs font-semibold leading-snug text-foreground">
              {product.name}
            </p>
            <StarRating
              rating={product.review.rating}
              count={product.review.count}
              compact
            />
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-sm font-black">
                ${product.price.toFixed(2)}
              </span>
              {product.discountPercent && (
                <span className="text-[10px] font-semibold text-red-600">
                  -{product.discountPercent}%
                </span>
              )}
            </div>
          </div>
        </Link>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={cn(
            "flex w-full items-center justify-center gap-1.5 border-t py-2 text-xs font-medium transition-colors",
            product.inStock
              ? "bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground"
              : "cursor-not-allowed text-muted-foreground",
          )}
        >
          <ShoppingCartIcon size={12} />
          {quantityInCart > 0
            ? `${quantityInCart} in Cart`
            : addedToCart
              ? "Added!"
              : product.inStock
                ? "Add to Cart"
                : "Out of Stock"}
        </button>
      </motion.div>
    );
  }

  // ── Ad strip variant ──────────────────────────────────────────────────
  if (variant === "mini") {
    return (
      <motion.div
        whileHover={{ backgroundColor: "var(--muted)" }}
        transition={{ duration: 0.15 }}
        className={cn(
          "group relative flex h-16 cursor-pointer items-center gap-3 px-3 transition-colors",
          className,
        )}
      >
        {/* Product image */}
        <div className="relative size-12 shrink-0 overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="48px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p className="line-clamp-1 text-xs font-semibold text-foreground">
            {product.name.split(" ").slice(0, 3).join(" ")}
          </p>
          {product.discountPercent && (
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              Big Sale {product.discountPercent}%
            </p>
          )}
        </div>

        {/* Active underline indicator */}
        {active && (
          <motion.div
            layoutId="ad-active-indicator"
            className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
          />
        )}
      </motion.div>
    );
  }

  // ── Default variant ────────────────────────────────────────────────────
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col bg-background transition-all hover:border hover:border-border hover:shadow-md hover:shadow-neutral-200/60",
        className,
      )}
    >
      {/* Image area */}
      <Link href={`/products/${product.id}`} className="relative">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Quick-view on hover */}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-black/60 py-2.5 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
            <EyeIcon size={14} className="text-white" />
            <span className="text-xs font-medium text-white">Quick View</span>
          </div>
        </div>

        {/* Overlaid badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {badge && (
            <Badge
              className={cn(
                "border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest",
                badge.className,
              )}
            >
              {badge.label}
            </Badge>
          )}
          {product.discountPercent && (
            <DiscountBadge percent={product.discountPercent} />
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute right-3 top-3 flex size-8 items-center justify-center border border-border bg-background/90 text-neutral-400 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
        >
          <HeartIcon
            size={16}
            weight={wishlisted ? "fill" : "regular"}
            className={cn(
              "transition-colors",
              wishlisted ? "text-rose-500" : "",
            )}
          />
        </button>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {product.brand}
          </span>
          {product.freeShipping && (
            <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-700">
              <TruckIcon size={10} weight="fill" />
              Free ship
            </span>
          )}
        </div>

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <StarRating
          rating={product.review.rating}
          count={product.review.count}
        />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price row */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-black text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Delivery */}
        {product.deliveryDays !== undefined && (
          <p className="text-[10px] text-muted-foreground">
            {product.deliveryDays <= 1 ? (
              <span className="font-semibold text-emerald-700">
                <LightningIcon
                  size={10}
                  className="mr-0.5 inline"
                  weight="fill"
                />
                Get it today
              </span>
            ) : (
              `Delivery in ${product.deliveryDays} days`
            )}
          </p>
        )}

        {/* Stock */}
        {!product.inStock && (
          <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-600">
            Out of stock
          </p>
        )}

        {/* Variants preview */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex items-center gap-1.5">
            {product.variants.slice(0, 4).map((v) => (
              <span
                key={v.value}
                className={cn(
                  "border px-1.5 py-0.5 text-[9px] font-medium",
                  v.inStock
                    ? "border-border text-foreground"
                    : "border-border/40 text-muted-foreground/50 line-through",
                )}
              >
                {v.label}
              </span>
            ))}
            {product.variants.length > 4 && (
              <span className="text-[9px] text-muted-foreground">
                +{product.variants.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Add to cart */}
      <div className="border-t border-border p-3 pt-0">
        <motion.button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={cn(
            "relative flex w-full items-center justify-center gap-2 overflow-hidden border py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-200",
            product.inStock
              ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
              : "cursor-not-allowed border-border bg-muted text-muted-foreground",
          )}
          whileTap={product.inStock ? { scale: 0.98 } : {}}
        >
          <AnimatePresence mode="wait">
            {addedToCart ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-1.5"
              >
                <SealCheckIcon size={14} weight="fill" />
                Added!
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-1.5"
              >
                <ShoppingCartIcon size={14} />

                {quantityInCart > 0
                  ? `${quantityInCart} in Cart`
                  : product.inStock
                    ? "Add to Cart"
                    : "Out of Stock"}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
