"use client";

import React, { useRef } from "react";
import { StaggerReveal } from "@/components/animations/reveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CaretRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { borderAnimeClass } from "./PromoCard";

import gsap from "gsap";

type ProductCard = {
  id: string;
  link: string;
  name: string;
  image: string;
  discount?: number;
};

export interface SpotlightProps {
  id?: string;
  title: string;
  description: string;
  link: string;
  image?: string;
  product?: ProductCard;
}

const collectionSpotlights: SpotlightProps[] = [
  {
    id: "women",
    title: "Comfy styles for her",
    description:
      "Shop WS Fashion including clothing, shoes, jewelry, watches, bags and more",
    link: "/shop/webstore-basics",
    image: "/images/spotlight/spotlight_woman.png",
    product: {
      id: "cat-001",
      link: "/shop/women/handbags",
      name: "Top Handbags",
      image:
        "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?q=80&w=800&auto=format&fit=crop",
      discount: 30,
    },
  },
  {
    id: "men",
    title: "Comfy styles for him",
    description:
    "Shop Amazon Fashion including clothing, shoes, jewelry, watches, bags and more",
    link: "/deals",
    image: "/images/spotlight/spotlight_man.png",
    product: {
      id: "cat-002",
      link: "/shop/men/shirts",
      name: "Checkered shirt",
      image:
        "https://images.unsplash.com/photo-1564400143768-2f8ea3f310f3?q=80&w=800&auto=format&fit=crop",
      discount: 30,
    },
  },
];

const CollectionSpotlight = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width - 0.5) * 2;
    const yPercent = (y / rect.height - 0.5) * 2;

    const title = card.querySelector(".sp-title");
    const desc = card.querySelector(".sp-desc");
    const product = card.querySelector(".sp-product");
    const image = card.querySelector(".sp-image");

    gsap.to(title, { x: xPercent * 10, y: yPercent * 8, duration: 0.4 });
    gsap.to(desc, { x: xPercent * 6, y: yPercent * 5, duration: 0.4 });
    gsap.to(product, { x: xPercent * 15, y: yPercent * 12, duration: 0.4 });
    gsap.to(image, { x: xPercent * -12, y: yPercent * -10, duration: 0.4 });
  };

  const resetMotion = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card.querySelectorAll("[data-parallax]"), {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <div className="mx-auto w-full max-w-360 px-4 py-8 md:px-8">
      <StaggerReveal
        stagger={0.12}
        variant="blur"
        className="grid md:grid-cols-2 gap-6 items-center"
      >
        {collectionSpotlights.map((card, index) => {
          const product = card.product;

          return (
            <div
              key={card.id ?? index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => resetMotion(index)}
              className={cn(
                "flex relative overflow-hidden rounded-xl h-full w-full",
                borderAnimeClass
              )}
            >
              <div className="p-4 flex flex-col lg:flex-row items-center justify-between gap-4 h-full w-full">

                {/* TEXT SIDE */}
                <div className="relative z-10">
                  <h2
                    data-parallax
                    className="sp-title mt-4 text-2xl font-semibold tracking-tight md:text-4xl"
                  >
                    {card.title}
                  </h2>

                  <p
                    data-parallax
                    className="sp-desc text-sm font-light max-w-sm mt-2"
                  >
                    {card.description}
                  </p>

                  <Link
                    href={card.link}
                    className="flex items-center gap-2 text-sm font-light max-w-sm mt-4"
                  >
                    See more <ArrowRightIcon size={16} />
                  </Link>

                  {product && (
                    <Link
                      href={product.link}
                      data-parallax
                      className="sp-product relative group flex items-center gap-4 p-2 mt-6"
                    >
                      <div className="relative w-14 aspect-square bg-amber-50 border overflow-hidden rounded-md">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="grid">
                        <h4 className="font-heading text-xl">
                          {product.name}
                        </h4>

                        {product.discount && (
                          <p className="font-light text-sm">
                            Big sale {product.discount}%
                          </p>
                        )}
                      </div>

                      <CaretRightIcon size={22} />
                    </Link>
                  )}
                </div>

                {/* IMAGE SIDE */}
                <div className="h-64 aspect-square relative">
                  {card.image && (
                    <div data-parallax className="sp-image w-full h-full">
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={300}
                        height={300}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </StaggerReveal>
    </div>
  );
};

export default CollectionSpotlight;