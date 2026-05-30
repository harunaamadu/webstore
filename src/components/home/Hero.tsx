"use client";

import * as React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import {
  ArrowRightIcon,
  StarIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

// ─── Slide Data ───────────────────────────────────────────────────────────────

const slides = [
  {
    category: "Computers & Accessories",
    title: "Shop Computers\n& Accessories",
    subtitle:
      "Laptops, desktops, monitors, tablets, PC gaming, hard drives & storage",
    accent: "#F5A623",
    badge: "20% OFF",
    product: {
      name: "Apple AirPods Pro (MWP22)",
      price: "$200.00",
      originalPrice: "$250.00",
      reviews: 349,
      image:
        "https://www.macpros.tech/images/AirPods-Pro/1200/AirPods_Pro_3_Hero_Secondary_Screen__USEN.webp", // swap with real path
    },
  },
  {
    category: "Phones & Wearables",
    title: "Next-Gen\nSmartphones",
    subtitle:
      "The latest flagships, smartwatches, earbuds and mobile accessories",
    accent: "#3B82F6",
    badge: "15% OFF",
    product: {
      name: "Samsung Galaxy S24 Ultra",
      price: "$899.00",
      originalPrice: "$1,099.00",
      reviews: 512,
      image: "/images/galaxy.png",
    },
  },
  {
    category: "Home & Kitchen",
    title: "Elevate Your\nLiving Space",
    subtitle:
      "Smart home devices, appliances, cookware and interior essentials",
    accent: "#10B981",
    badge: "Up to 30%",
    product: {
      name: "Dyson V15 Detect Vacuum",
      price: "$649.00",
      originalPrice: "$749.00",
      reviews: 278,
      image: "/images/dyson.png",
    },
  },
];

type Slide = (typeof slides)[0];

// ─── Progress Bar ─────────────────────────────────────────────────────────────
const ProgressBar = ({
  current,
  total,
  onGo,
}: {
  current: number;
  total: number;
  onGo: (i: number) => void;
}) => (
  <div className="absolute bottom-0 left-0 z-30 flex w-full h-0.5">
    {Array.from({ length: total }).map((_, i) => (
      // Fix 3: relative + flex-1 so each segment sits side-by-side, all clickable
      <button
        key={i}
        onClick={() => onGo(i)}
        className="relative flex-1 h-full overflow-hidden cursor-pointer"
        aria-label={`Go to slide ${i + 1}`}
      >
        {/* Fix 4: visible inactive track */}
        <span className="absolute inset-0 bg-white" />

        {/* Fix 1+2+5: active fill — only rendered for current, full opacity */}
        {i === current && (
          <motion.span
            key={current}
            className="absolute inset-y-0 left-0 opacity-60"
            style={{ background: slides[i].accent }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.5, ease: "linear" }}
          />
        )}
      </button>
    ))}
  </div>
);

// ─── Scroll Indicator ─────────────────────────────────────────────────────────

const ScrollIndicator = () => (
  <div className="absolute bottom-6 right-8 z-30 flex flex-col items-center gap-2">
    <span className="text-neutral-400 text-[10px] tracking-[0.25em] uppercase font-light">
      Scroll
    </span>
    <div className="w-px h-8 bg-neutral-200 overflow-hidden relative">
      <motion.div
        className="absolute top-0 left-0 w-full bg-neutral-400"
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ height: "50%" }}
      />
    </div>
  </div>
);

// ─── Stars ────────────────────────────────────────────────────────────────────

const Stars = ({ filled = 5 }: { filled?: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <StarIcon
        key={i}
        size={12}
        weight={i < filled ? "fill" : "regular"}
        className={i < filled ? "text-amber-400" : "text-neutral-300"}
      />
    ))}
  </div>
);

// ─── Product Card ─────────────────────────────────────────────────────────────
// Fix 2: product image now floats ABOVE the card, overflowing the top edge

const ProductCard = ({
  product,
  accent,
  badge,
}: {
  product: Slide["product"];
  accent: string;
  badge: string;
}) => (
  // Extra top padding to make room for the floating image
  <div className="relative pt-16 w-70">
    {/* ── Floating image — overflows above card ── */}
    <div
      className="
        absolute -top-1/2 left-1/2 translate-y-10 -translate-x-[calc(50%-50px)] z-20
        h-64 aspect-square
        drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)]
        pointer-events-none
      "
    >
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
          sizes="128px"
        />
      ) : (
        // Placeholder when no real image provided
        <div
          className="h-full w-full flex items-center justify-center"
          style={{ background: `${accent}18` }}
        >
          <span
            className="text-3xl font-black opacity-25 tracking-tighter"
            style={{ color: accent }}
          >
            IMG
          </span>
        </div>
      )}
    </div>

    {/* ── Card body ── */}
    <div
      className="
        relative flex flex-col gap-3 translate-y-20
        border border-neutral-200/80
        bg-white/95 px-5 pb-5 pt-6 pr-24
        shadow-xl shadow-neutral-300/40
        backdrop-blur-sm
      "
    >
      {/* Discount badge */}
      <span
        className="absolute -right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full text-[9px] font-black text-white shadow-md leading-tight text-center"
        style={{ background: accent }}
      >
        {badge}
      </span>

      <div className="space-y-1.5">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
          {product.name.split(" ").slice(0, 2).join(" ")}
        </p>
        <h4 className="text-sm font-bold leading-snug text-neutral-900">
          {product.name}
        </h4>

        <div className="flex items-center gap-1.5">
          <Stars filled={5} />
          <span className="text-[10px] text-neutral-400">
            {product.reviews} reviews
          </span>
        </div>

        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-base font-black text-neutral-900">
            {product.price}
          </span>
          <span className="text-xs text-neutral-400 line-through">
            {product.originalPrice}
          </span>
        </div>
      </div>

      <button
        className="flex items-center gap-1.5 text-xs font-bold transition-all duration-200 hover:gap-2.5 w-fit"
        style={{ color: accent }}
      >
        View more <ArrowRightIcon size={11} weight="bold" />
      </button>
    </div>
  </div>
);

// ─── Hero Slide ───────────────────────────────────────────────────────────────

const HeroSlide = ({
  slide,
  isActive,
}: {
  slide: Slide;
  isActive: boolean;
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const categoryRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(
        [
          categoryRef.current,
          titleRef.current,
          subtitleRef.current,
          btnRef.current,
        ],
        {
          opacity: 0,
          y: 24,
        },
      );
      gsap.set(cardRef.current, { opacity: 0, x: 40, scale: 0.95 });
      gsap.set(accentRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      tl.to(categoryRef.current, { opacity: 1, y: 0, duration: 0.45 })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.25")
        .to(accentRef.current, { scaleX: 1, duration: 0.4 }, "-=0.3")
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
        .to(btnRef.current, { opacity: 1, y: 0, duration: 0.35 }, "-=0.15")
        .to(
          cardRef.current,
          { opacity: 1, x: 0, scale: 1, duration: 0.6 },
          "-=0.45",
        );
    });

    return () => ctx.revert();
  }, [isActive, slide]);

  return (
    <div className="relative grid md:grid-cols-2 h-full w-full items-center justify-center gap-8 overflow-hidden px-6 py-12 md:px-8">
      {/* Background accent blob */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[110%] w-[55%] rounded-l-[4rem] opacity-[0.06]"
        style={{ background: slide.accent }}
      />

      {/* Side dots */}
      <div className="absolute left-6 top-1/2 flex -translate-y-1/2 flex-col gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full transition-all duration-300"
            style={{ background: i === 1 ? slide.accent : "#D1D5DB" }}
          />
        ))}
      </div>

      {/* Left */}
      <div className="flex max-w-ms flex-col gap-5 pl-4">
        <span
          ref={categoryRef}
          className="text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color: slide.accent }}
        >
          {slide.category}
        </span>

        <div className="space-y-1">
          <h2
            ref={titleRef}
            className="whitespace-pre-line text-4xl font-black uppercase leading-[1.05] tracking-tight text-neutral-900 lg:text-5xl"
          >
            {slide.title}
          </h2>
          <div
            ref={accentRef}
            className="mt-1 h-1 w-16"
            style={{ background: slide.accent }}
          />
        </div>

        <p
          ref={subtitleRef}
          className="text-sm leading-relaxed text-neutral-500"
        >
          {slide.subtitle}
        </p>

        <button
          ref={btnRef}
          className="group flex w-fit items-center gap-2 border-2 px-5 py-2.5 text-sm font-bold transition-all duration-200"
          style={{ borderColor: slide.accent, color: slide.accent }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = slide.accent;
            el.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "transparent";
            el.style.color = slide.accent;
          }}
        >
          View more
          <ArrowRightIcon
            size={14}
            weight="bold"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </div>

      {/* Right — floating product card */}
      <div
        ref={cardRef}
        className="relative hidden md:flex items-center justify-center pr-8"
      >
        {/* Decorative circle behind */}
        <div
          className="absolute h-52 w-52 opacity-[0.07]"
          style={{ background: slide.accent }}
        />
        <ProductCard
          product={slide.product}
          accent={slide.accent}
          badge={slide.badge}
        />
      </div>
    </div>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  // Fix 3: all carousel state lives here in Hero, not inside HeroSlide
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Swipe refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const swipeSensitivity = 80 as number

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = swipeSensitivity;

    if (distance > minSwipeDistance) {
      // Swiped left
      goNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right
      goPrev();
    }
  };

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(goNext, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goNext, isPaused]);

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    );
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="mx-auto w-full max-w-360 px-4 py-6 md:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative group h-120 max-h-full w-full overflow-hidden border border-neutral-200/60 bg-neutral-50 shadow-sm md:h-120">
        {/* Slides — AnimatePresence for crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <HeroSlide slide={slides[current]} isActive />
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <Button
          onClick={goPrev}
          className="absolute -left-4 top-1/2 opacity-0 group-hover:left-4 group-hover:opacity-100 -translate-y-1/2 z-30 h-9 w-9 border border-neutral-200 bg-white/80 shadow-md backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-all"
          aria-label="Previous slide"
          asChild
        >
          <CaretLeftIcon size={16} weight="bold" className="text-neutral-600" />
        </Button>
        <Button
          onClick={goNext}
          className="absolute -right-4 top-1/2 opacity-0 group-hover:right-4 group-hover:opacity-100 -translate-y-1/2 z-30 h-9 w-9 border border-neutral-200 bg-white/80 shadow-md backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-all"
          aria-label="Next slide"
          asChild
        >
          <CaretRightIcon
            size={16}
            weight="bold"
            className="text-neutral-600"
          />
        </Button>

        {/* Progress + scroll — Fix 4: now correctly inside the slide container */}
        <ProgressBar current={current} total={slides.length} onGo={goTo} />
        <ScrollIndicator />
      </div>
    </div>
  );
}
