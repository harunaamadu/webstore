"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCartIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { ClientOnly } from "@/components/common";
import { useCartStore } from "@/store/cart.store";

const CartButton = () => {
  const itemCount = useCartStore((s) => s.itemCount);

  return (
    <Button variant="ghost" asChild>
      <Link
        href="/cart"
        aria-label={`Cart — ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
        className="relative h-12 aspect-square text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 flex items-center justify-center hover:opacity-70 transition-opacity"
      >
        <ShoppingCartIcon size={24} />

        <AnimatePresence mode="wait">
          {itemCount > 0 && (
            <ClientOnly>
              <motion.span
                key={itemCount}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [1, 1.25, 1], opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="absolute -top-1.5 -right-1.5 min-w-4.5 h-4.5 flex items-center justify-center bg-primary/75 text-primary-foreground text-[10px] font-semibold px-1 leading-none"
              >
                {itemCount > 99 ? "99+" : itemCount}
              </motion.span>
            </ClientOnly>
          )}
        </AnimatePresence>
      </Link>
    </Button>
  );
};

export default CartButton;