"use client";

import React, { useEffect, useState } from "react";
import ProductLayout from "@/components/product/ProductLayout";
import type { Product } from "@/types";
import { mockProducts } from "@/data";

// ─── Daily seed ─────────────────────────────────────────────────────────────
// Builds a deterministic-but-daily shuffle using today's date as a seed.
// Same user sees the same picks all day; picks rotate at midnight.

function getDailySeed(): number {
  const now  = new Date();
  // YYYYMMDD as an integer — changes once per day
  return (
    now.getFullYear() * 10000 +
    (now.getMonth() + 1) * 100 +
    now.getDate()
  );
}

// Mulberry32 — fast, seedable PRNG (no external deps)
function mulberry32(seed: number) {
  return function (): number {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getDailyRecommendations(count: number): Product[] {
  const seed   = getDailySeed();
  const rand   = mulberry32(seed);
  const pool   = [...mockProducts];

  // Fisher-Yates shuffle driven by the seeded PRNG
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, count);
}

// ─── Midnight refresh ────────────────────────────────────────────────────────
// Returns ms until the next midnight so we can schedule a re-render.

function msUntilMidnight(): number {
  const now       = new Date();
  const midnight  = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

// ─── Recommendations ─────────────────────────────────────────────────────────

const RECOMMENDATION_COUNT = 8;

const Recommendations = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading,  setLoading]  = useState(true);

  // Generate today's picks, then re-generate at the next midnight
  useEffect(() => {
    // Small artificial delay so skeleton shows briefly (remove if hitting a real API)
    const init = setTimeout(() => {
      setProducts(getDailyRecommendations(RECOMMENDATION_COUNT));
      setLoading(false);
    }, 800);

    // Schedule a refresh exactly at midnight
    const refresh = setTimeout(() => {
      setProducts(getDailyRecommendations(RECOMMENDATION_COUNT));
    }, msUntilMidnight());

    return () => {
      clearTimeout(init);
      clearTimeout(refresh);
    };
  }, []);

  return (
    <ProductLayout
      eyebrow="You may like"
      title="Recommendations"
      products={products}
      loading={loading}
      skeletonCount={RECOMMENDATION_COUNT}
      link={{ href: "/shop/recommendations", label: "View All" }}
      emptyIcon="recommendations"
      emptyTitle="No recommendations yet"
      emptyDescription="Check back tomorrow for fresh picks."
    />
  );
};

export default Recommendations;