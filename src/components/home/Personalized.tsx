"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { StaggerReveal } from "../animations/reveal";

type PersonalizedItem = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  href?: string;
  highlight?: boolean;
};

const Personalized = () => {
  /**
   * Replace this with your auth/session/user fetch
   * Example:
   * const { data: session } = useSession()
   */
  const user = {
    name: "Guess",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
  };

  const items = useMemo<PersonalizedItem[]>(
    () => [
      {
        id: 0,
        title: `Hi, ${user.name}`,
        subtitle: "Recommendations for you 👉",
        image: user.avatar,
        highlight: true,
      },
      {
        id: 1,
        title: "Home Decor",
        subtitle: "Big Sale 30%",
        image:
          "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "Pillows",
        subtitle: "Soft & Cozy",
        image:
          "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: 3,
        title: "Pet Feeders",
        subtitle: "Big Sale 50%",
        image:
          "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: 4,
        title: "Minimal Chairs",
        subtitle: "Trending Now",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop",
      },
    ],
    [user.name, user.avatar],
  );

  return (
    <section className="mx-auto w-full max-w-360 px-4 py-4 md:px-8">
      <div className="overflow-hidden p-4 select-none">
        <Carousel
          opts={{
            align: "center",
            dragFree: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {items.map((item, index) => (
              <CarouselItem
                key={item.id}
                className={cn(
                  "pl-3",
                  index === 0
                    ? "basis-full sm:basis-[55%] md:basis-[38%] lg:basis-[28%]"
                    : "basis-full sm:basis-[42%] md:basis-[30%] lg:basis-[22%]",
                )}
              >
                <StaggerReveal stagger={0.12} direction="up" variant="blur">
                  <motion.div
                    whileHover={{
                      y: -3,
                      scale: 1.01,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className={cn(
                      "group relative flex h-full min-h-28 items-center gap-4 overflow-hidden border bg-background/80 p-4 shadow-sm transition-colors",
                      item.highlight &&
                        "border-primary/20 bg-linear-to-br from-primary/5 via-background to-background",
                    )}
                  >
                    {/* Glow */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5" />
                    </div>

                    {/* Image */}
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                      }}
                      className={cn(
                        "relative shrink-0 overflow-hidden",
                        item.highlight ? "size-16" : "size-18",
                      )}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="100px"
                        className={cn(
                          "object-cover",
                          item.highlight && "rounded-full",
                        )}
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10 flex min-w-0 flex-1 flex-col">
                      <h3 className="truncate text-sm md:text-base font-semibold text-foreground">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      initial={{ opacity: 0.6 }}
                      whileHover={{ x: 4 }}
                      className="flex shrink-0 items-center justify-center border bg-background p-2"
                    >
                      <ArrowRightIcon className="size-4" />
                    </motion.div>
                  </motion.div>
                </StaggerReveal>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Personalized;
