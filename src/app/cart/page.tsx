"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  TrashIcon,
  TruckIcon,
  SealCheckIcon,
  TagIcon,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerReveal } from "@/components/animations/reveal";
import { CartItem, useCartStore } from "@/store/cart.store";

// ─── Constants ─────────────────────────────────────────────────────────────

const SHIPPING_THRESHOLD = 100;
const SHIPPING_COST      = 9.99;
const TAX_RATE           = 0.085;

// ─── Cart item row ──────────────────────────────────────────────────────────

const CartItemRow = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const { product, quantity, selectedVariant } = item;
  const variantValue = selectedVariant?.value;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.25 }}
      className="flex gap-4 border-b border-border py-5 last:border-0"
    >
      {/* Image */}
      <Link href={`/products/${product.id}`} className="shrink-0">
        <div className="relative size-24 overflow-hidden border border-border bg-muted sm:size-28">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {product.brand}
            </p>
            <Link href={`/products/${product.id}`}>
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug hover:text-primary">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(product.id, variantValue)}
            aria-label="Remove item"
            className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
          >
            <TrashIcon size={15} />
          </button>
        </div>

        {/* Variant */}
        {selectedVariant && (
          <span className="w-fit border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
            {selectedVariant.label}
          </span>
        )}

        {/* Shipping note */}
        {product.freeShipping && (
          <p className="flex items-center gap-1 text-[10px] font-medium text-emerald-700">
            <TruckIcon size={10} weight="fill" />
            Free shipping
          </p>
        )}

        {/* Price + Qty */}
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex items-center border border-border">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1, variantValue)}
              className="flex size-7 items-center justify-center transition-colors hover:bg-muted disabled:opacity-40"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <MinusIcon size={12} weight="bold" />
            </button>
            <span className="min-w-8 text-center text-xs font-semibold tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1, variantValue)}
              className="flex size-7 items-center justify-center transition-colors hover:bg-muted"
              aria-label="Increase quantity"
            >
              <PlusIcon size={12} weight="bold" />
            </button>
          </div>

          <div className="flex items-baseline gap-2 text-right">
            <span className="text-sm font-black">
              ${(product.price * quantity).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${(product.originalPrice * quantity).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Empty cart ─────────────────────────────────────────────────────────────

const EmptyCart = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex min-h-80 flex-col items-center justify-center gap-4 text-center"
  >
    <div className="flex size-20 items-center justify-center border border-dashed border-border">
      <ShoppingCartIcon size={32} className="text-muted-foreground" />
    </div>
    <div>
      <p className="text-base font-semibold">Your cart is empty</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Add items to get started
      </p>
    </div>
    <Button asChild>
      <Link href="/shop" className="gap-2">
        Continue Shopping
        <ArrowRightIcon size={14} />
      </Link>
    </Button>
  </motion.div>
);

// ─── Order summary ──────────────────────────────────────────────────────────

const OrderSummary = ({
  subtotal,
  savings,
}: {
  subtotal: number;
  savings: number;
}) => {
  const shippingFree  = subtotal >= SHIPPING_THRESHOLD;
  const shipping      = shippingFree ? 0 : SHIPPING_COST;
  const tax           = subtotal * TAX_RATE;
  const total         = subtotal + shipping + tax;
  const toFreeShip    = SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="border border-border bg-muted/20 p-5">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest">
        Order Summary
      </h2>

      {/* Free shipping progress */}
      {!shippingFree && (
        <div className="mb-4 space-y-1.5">
          <p className="text-xs text-muted-foreground">
            Add{" "}
            <span className="font-semibold text-foreground">
              ${toFreeShip.toFixed(2)}
            </span>{" "}
            more for free shipping
          </p>
          <div className="h-1.5 w-full overflow-hidden bg-border">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(subtotal / SHIPPING_THRESHOLD) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {shippingFree && (
        <div className="mb-4 flex items-center gap-2 border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
          <SealCheckIcon size={14} weight="fill" />
          You qualify for free shipping!
        </div>
      )}

      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-emerald-700">
            <span className="flex items-center gap-1">
              <TagIcon size={11} weight="fill" />
              Savings
            </span>
            <span className="font-semibold">-${savings.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          {shippingFree ? (
            <span className="font-semibold text-emerald-700">Free</span>
          ) : (
            <span className="font-medium">${SHIPPING_COST.toFixed(2)}</span>
          )}
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Tax ({(TAX_RATE * 100).toFixed(1)}%)
          </span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        <div className="my-1 h-px bg-border" />

        <div className="flex justify-between text-sm font-black">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Button className="mt-5 w-full gap-2" size="lg">
        Proceed to Checkout
        <ArrowRightIcon size={14} />
      </Button>

      <Button variant="ghost" className="mt-2 w-full text-xs" asChild>
        <Link href="/shop">Continue Shopping</Link>
      </Button>
    </div>
  );
};

// ─── Cart page ──────────────────────────────────────────────────────────────

const CartPage = () => {
  const { items, subtotal, savings, itemCount, clearCart } = useCartStore();
  const isEmpty = items.length === 0;

  return (
    <div className="mx-auto w-full max-w-360 px-4 py-8 md:px-8">
      {/* Header */}
      <Reveal variant="slide" direction="up">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Shopping
            </p>
            <h1 className="mt-0.5 text-2xl font-black uppercase tracking-tight md:text-3xl">
              Your Cart
              {itemCount > 0 && (
                <span className="ml-2 text-lg font-normal text-muted-foreground">
                  ({itemCount} item{itemCount !== 1 ? "s" : ""})
                </span>
              )}
            </h1>
          </div>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/shop" className="gap-1.5 text-muted-foreground">
              <ArrowLeftIcon size={13} />
              Back to shop
            </Link>
          </Button>
        </div>
      </Reveal>

      {isEmpty ? (
        <EmptyCart />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Left — item list */}
          <div>
            {/* Actions bar */}
            <div className="mb-2 flex items-center justify-between border-b border-border pb-3">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{itemCount}</span>{" "}
                item{itemCount !== 1 ? "s" : ""} in your cart
              </p>
              <button
                onClick={clearCart}
                className="text-[10px] text-muted-foreground underline-offset-2 transition-colors hover:text-destructive hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* Items */}
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <CartItemRow
                  key={`${item.product.id}::${item.selectedVariant?.value ?? "base"}`}
                  item={item}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Right — summary */}
          <Reveal variant="slide" direction="left" delay={0.1}>
            <OrderSummary subtotal={subtotal} savings={savings} />
          </Reveal>
        </div>
      )}
    </div>
  );
};

export default CartPage;