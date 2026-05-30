"use client"

import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { announcementArray } from "@/data/announcement_data"
import type { AnnouncementProps } from "@/types"

// Highlights matching substrings in bold
const HighlightedText = ({ text, highlight }: Pick<AnnouncementProps, "text" | "highlight">) => {
  const terms  = Array.isArray(highlight) ? highlight : [highlight]
  const regex  = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g")
  const parts  = text.split(regex)

  return (
    <>
      {parts.map((part, i) =>
        terms.includes(part) ? (
          <span key={i} className="font-semibold text-neutral-900">{part}</span>
        ) : (
          part
        )
      )}
    </>
  )
}

export const AnnouncementCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <Carousel
      opts={{ align: "center", loop: true }}
      orientation="vertical"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full max-w-sm overflow-hidden h-fit select-none"
    >
      <CarouselContent className="h-8 my-auto">
        {announcementArray.map((item, index) => (
          <CarouselItem key={index} className="basis-full pt-0 flex items-center">
            <a
              href={item.href}
              className="text-xs hover:underline underline-offset-2 transition-all"
            >
              <HighlightedText text={item.text} highlight={item.highlight} />
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Hidden prev/next — autoplay drives navigation; keep for a11y */}
      <CarouselPrevious className="sr-only" />
      <CarouselNext    className="sr-only" />
    </Carousel>
  )
}