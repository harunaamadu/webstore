"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  GameControllerIcon,
  HeadphonesIcon,
  LaptopIcon,
  SparkleIcon,
  LegoIcon,
  VirtualRealityIcon,
} from "@phosphor-icons/react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Reveal, StaggerReveal } from "../animations/reveal";
import SectionTitle from "../common/sectionTitle";

type CategoryItem = {
  id: number;
  title: string;
  image: string;
  href: string;
  icon: React.ElementType;
};

const Category = () => {
  const categories = useMemo<CategoryItem[]>(
    () => [
      {
        id: 1,
        title: "Beauty Picks",
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
        href: "/shop/beauty",
        icon: SparkleIcon,
      },
      {
        id: 2,
        title: "Computers & Accessories",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
        href: "/shop/computers",
        icon: LaptopIcon,
      },
      {
        id: 3,
        title: "VR & Gaming",
        image:
          "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000&auto=format&fit=crop",
        href: "/shop/vr",
        icon: VirtualRealityIcon,
      },
      {
        id: 4,
        title: "Toys & Games",
        image:
          "https://images.unsplash.com/photo-1605192704979-2bb15327c206?q=80&w=1000&auto=format&fit=crop",
        href: "/shop/toys",
        icon: LegoIcon,
      },
      {
        id: 5,
        title: "Audio Devices",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
        href: "/shop/audio",
        icon: HeadphonesIcon,
      },
      {
        id: 6,
        title: "Gaming Consoles",
        image:
          "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1000&auto=format&fit=crop",
        href: "/shop/gaming",
        icon: GameControllerIcon,
      },
    ],
    [],
  );

  return (
    <section className="mx-auto w-full max-w-360 px-4 py-4 md:px-8">
      {/* Header */}
      <SectionTitle
        eyebrow="Discover"
        title="Shop by Categories"
        link={{
          href: "/shop",
          label: "All Departments",
        }}
      />

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 md:-ml-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <CarouselItem
                key={category.id}
                className="pl-3 md:pl-4 sm:basis-1/2 lg:basis-1/4"
              >
                <StaggerReveal stagger={0.12} direction="up" variant="blur">
                  <motion.div
                    whileHover={{
                      y: -4,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="group h-full"
                  >
                    <Link
                      href={category.href}
                      className="flex h-full flex-col border bg-background/60"
                    >
                      {/* Image */}
                      <div className="relative group aspect-4/5 overflow-hidden bg-muted">
                        <Image
                          src={category.image}
                          alt={category.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Floating Icon */}
                        <div className="absolute left-4 top-4 flex size-16 opacity-0 -translate-x-24 group-hover:opacity-100 group-hover:translate-x-0 items-center justify-center border border-accent/30 bg-black/50 text-white backdrop-blur-sm transition-all duration-300">
                          <Icon size={32} weight="duotone" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex items-center justify-between gap-3 p-4">
                        <h3 className="line-clamp-1 text-sm font-medium md:text-base">
                          {category.title}
                        </h3>

                        <ArrowRightIcon
                          size={18}
                          className="shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>
                    </Link>
                  </motion.div>
                </StaggerReveal>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Mobile Link */}
      <div className="mt-6 flex sm:hidden">
        <Link
          href="/shop"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          All Departments
          <ArrowRightIcon
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
};

export default Category;
