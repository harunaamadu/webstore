"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@phosphor-icons/react";

import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

import { borderAnimeClass, PromoProps } from "./PromoCard";

const promoCard: PromoProps = {
  title: "Webstore Basics",
  description:
    "Shop Today’s Deals, Lightning Deals, and limited-time discounts",
  link: "/shop/webstore-basics",
  image: "/images/promos/large_banner.png",
};

const LargePromoCard = () => {
  return (
    <section className="mx-auto w-full max-w-360 px-4 py-8 md:px-8">
      <Reveal variant="blur">
        <div
          className={cn(
            "relative overflow-hidden border bg-background",
            borderAnimeClass
          )}
        >
          <div className="relative group z-10 flex min-h-72 flex-col justify-between gap-8 p-6 sm:flex-row sm:items-center md:p-8 md:px-16">
            {/* Content */}
            <div className="max-w-lg">
              <span className="inline-flex px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Discover Webstore
              </span>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                {promoCard.title}
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                {promoCard.description}
              </p>

              <Link
                href={promoCard.link}
                className="group mt-6 inline-flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors hover:text-primary"
              >
                Shop Now

                <ArrowRightIcon
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Image */}
            {promoCard.image && (
              <div className="relative mx-auto aspect-4/3 w-52 shrink-0 sm:mx-0 sm:w-sm md:w-md">
                <Image
                  src={promoCard.image}
                  alt={promoCard.title}
                  fill
                  priority
                  sizes="40vw"
                  className="object-contain scale-150 w-full h-full transition-transform duration-700 group-hover:scale-155 pointer-events-none"
                />
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default LargePromoCard;