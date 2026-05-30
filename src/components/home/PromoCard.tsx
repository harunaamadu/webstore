"use client";

import React from "react";
import { StaggerReveal } from "@/components/animations/reveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface PromoProps {
  title: string;
  description: string;
  link: string;
  image?: string;
}

const promoCards: PromoProps[] = [
  {
    title: "Webstore Basics",
    description:
      "Shop Today’s Deals, Lightning Deals, and limited-time discounts",
    link: "/shop/webstore-basics",
    image: "/images/promos/controller.png",
  },
  {
    title: "Deals & Promotions",
    description:
      "Shop Today’s Deals, Lightning Deals, and limited-time discounts",
    link: "/deals",
    image: "/images/promos/clock.png",
  },
];

export const borderAnimeClass = `
    before:pointer-events-none
    before:absolute
    before:top-1/2
    before:left-1/2
    before:-z-10
    before:h-1/2
    before:-translate-x-1/2
    before:-translate-y-1/2
    before:origin-center
    before:scale-x-110
    before:bg-linear-to-b
    before:from-transparent
    before:via-primary
    before:to-transparent
    before:animate-spin
    before:w-[calc(100%+200px)]
    before:[animation-duration:12s]

    after:pointer-events-none
    after:absolute
    after:left-1/2
    after:top-1/2
    after:-z-10
    after:h-[calc(100%-2px)]
    after:w-[calc(100%-2px)]
    after:-translate-x-1/2
    after:-translate-y-1/2
    after:origin-center
    after:bg-background
    after:outline-0
`;

const PromoCard = () => {
  return (
    <div className="mx-auto w-full max-w-360 px-4 py-8 md:px-8">
      <StaggerReveal
        stagger={0.12}
        variant="blur"
        className="grid md:grid-cols-2 gap-6 items-center"
      >
        {promoCards.map((card, index) => (
          <div
            className={cn(
              "flex relative h-full w-full overflow-hidden",
              borderAnimeClass,
              `${index % 2 && "before:[animation-delay:8s]"}`,
            )}
            key={index}
          >
            <div className="p-4 flex flex-col lg:flex-row items-center justify-between gap-2 md:gap-4 h-full w-full">
              <div>
                <h3 className="font-heading text-xl font-semibold">
                  {card.title}
                </h3>
                <h3 className="text-sm font-light max-w-sm mt-2">
                  {card.description}
                </h3>
                <Link
                  href={card.link}
                  className="flex items-center gap-2 text-sm font-light max-w-sm mt-4"
                >
                  See more <ArrowRightIcon size={16} />
                </Link>
              </div>

              {card.image && (
                <Image
                  src={card.image}
                  alt={card.title}
                  width={150}
                  height={150}
                  className="object-contain h-full aspect-square translate-x-12"
                />
              )}
            </div>
          </div>
        ))}
      </StaggerReveal>
    </div>
  );
};

export default PromoCard;
