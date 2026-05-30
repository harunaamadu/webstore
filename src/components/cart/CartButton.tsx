"use client";

import { useState } from "react";
import Link from "next/link";
// import { useCartStore } from "@/store/cart.store";
import { ShoppingCartIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { ClientOnly } from "../common";
import { Button } from "../ui/button";

export default function CartButton() {
  //   const { toggleCart, getItemCount } = useCartStore();

  const [cartCount] = useState(2);
  //   const cartCount = getItemCount();

  return (
    <Button variant={`ghost`} asChild>
      <Link
        href="/cart"
        //   onClick={toggleCart}
        className="h-12 aspect-square text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 relative flex items-center justify-center gap-1 hover:opacity-70 transition-opacity"
        aria-label="Open cart"
      >
        <ShoppingCartIcon size={24} />

        {cartCount > 0 && (
          <AnimatePresence mode="wait">
            <ClientOnly>
              <motion.span
                key={cartCount}
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
                {cartCount > 9 ? "9+" : cartCount}
              </motion.span>
            </ClientOnly>
          </AnimatePresence>
        )}
      </Link>
    </Button>
  );
}
