"use client";

import React, { useState } from "react";
import Link from "next/link";
// import { useCartStore } from "@/store/cart.store";
import { AnimatePresence, motion } from "framer-motion";
import { ClientOnly } from "../common";
import { Button } from "../ui/button";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

const SearchBtn = () => {
  const [SearchResult] = useState(0);

  return (
    <Button
      variant="ghost"
      //   onClick={toggleSearch}
      aria-label="Open cart"
      asChild
    >
      <div className="h-12 aspect-square text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 relative flex items-center justify-center gap-1 hover:opacity-70 transition-opacity">
        <MagnifyingGlassIcon size={24} />

      {SearchResult > 0 && (
        <AnimatePresence mode="wait">
          <ClientOnly>
            <motion.span
              key={SearchResult}
              initial={{ scale: 0.7, opacity: 0.7 }}
              animate={{
                scale: [1, 1.25, 1],
                opacity: 1,
              }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
              className="absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 flex items-center justify-center bg-primary/75 text-primary-foreground text-[10px] font-semibold px-1 leading-none"
            >
              {SearchResult > 9 ? "9+" : SearchResult}
            </motion.span>
          </ClientOnly>
        </AnimatePresence>
      )}
      </div>
    </Button>
  );
};

export default SearchBtn;
