"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { ClientOnly } from "@/components/common";
import { useSearchStore } from "@/store/search.store";

const SearchBtn = () => {
  const { openSearch, results, query } = useSearchStore();

  const showBadge = query.trim().length > 0 && results.length > 0;

  return (
    <Button
      variant="ghost"
      onClick={openSearch}
      aria-label="Open search"
      className="relative h-12 aspect-square text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 hover:opacity-70 transition-opacity"
    >
      <MagnifyingGlassIcon size={24} />

      <AnimatePresence mode="wait">
        {showBadge && (
          <ClientOnly>
            <motion.span
              key={results.length}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [1, 1.25, 1], opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 flex items-center justify-center bg-primary/75 text-primary-foreground text-[10px] font-semibold px-1 leading-none"
            >
              {results.length > 99 ? "99+" : results.length}
            </motion.span>
          </ClientOnly>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default SearchBtn;