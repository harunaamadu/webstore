"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Icon } from "@phosphor-icons/react";
import {
  ClockCounterClockwiseIcon,
  TrophyIcon,
  ShoppingBagIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

// ─── SkeletonCard ──────────────────────────────────────────────────────────

export const SkeletonCard = () => (
  <div className="flex flex-col border border-border bg-background">
    <div className="aspect-square w-full animate-pulse bg-muted" />
    <div className="flex flex-col gap-2 p-4">
      <div className="h-2.5 w-1/3 animate-pulse rounded-none bg-muted" />
      <div className="h-3 w-full animate-pulse rounded-none bg-muted" />
      <div className="h-3 w-4/5 animate-pulse rounded-none bg-muted" />
      <div className="mt-1 h-2 w-1/2 animate-pulse rounded-none bg-muted" />
      <div className="mt-2 h-5 w-1/3 animate-pulse rounded-none bg-muted" />
    </div>
    <div className="border-t border-border p-3">
      <div className="h-8 w-full animate-pulse rounded-none bg-muted" />
    </div>
  </div>
);

// ─── ProductsSkeleton ──────────────────────────────────────────────────────

interface ProductsSkeletonProps {
  /** Number of skeleton cards to render */
  count?: number;
  /** Tailwind grid class — defaults to a responsive 2→3→4 col grid */
  className?: string;
}

export const ProductsSkeleton = ({
  count = 4,
  className = "grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5",
}: ProductsSkeletonProps) => (
  <div className={className}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

// ─── Preset icons ──────────────────────────────────────────────────────────

export const EMPTY_STATE_ICONS = {
  history: ClockCounterClockwiseIcon,
  bestsellers: TrophyIcon,
  default: ShoppingBagIcon,
} satisfies Record<string, Icon>;

export type EmptyStatePreset = keyof typeof EMPTY_STATE_ICONS;

// ─── ProductsEmpty ─────────────────────────────────────────────────────────

interface ProductsEmptyProps {
  /** Icon preset key or a custom Phosphor icon component */
  icon?: EmptyStatePreset | Icon;
  title?: string;
  description?: string;
  /** Optional CTA — e.g. "Browse all products" */
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const ProductsEmpty = ({
  icon = "default",
  title = "No products found",
  description = "Try adjusting your filters or check back later.",
  action,
}: ProductsEmptyProps) => {
  const IconComponent =
    typeof icon === "string" ? EMPTY_STATE_ICONS[icon] : icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-52 flex-col items-center justify-center gap-3 border border-dashed border-border bg-muted/20 px-6 text-center"
    >
      <div className="flex size-12 items-center justify-center border border-border bg-background">
        <IconComponent size={22} className="text-muted-foreground" />
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>

      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </motion.div>
  );
};