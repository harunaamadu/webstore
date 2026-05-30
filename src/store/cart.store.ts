import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, ProductVariant } from "@/types";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

interface CartState {
  items: CartItem[];

  // Derived
  itemCount:  number;
  subtotal:   number;
  savings:    number;

  // Actions
  addItem:        (product: Product, variant?: ProductVariant) => void;
  removeItem:     (productId: string, variantValue?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantValue?: string) => void;
  clearCart:      () => void;
}

// ─── Key helper ────────────────────────────────────────────────────────────
// Unique cart line = product + selected variant (if any)

function lineKey(productId: string, variantValue?: string) {
  return variantValue ? `${productId}::${variantValue}` : productId;
}

function matchesKey(item: CartItem, productId: string, variantValue?: string) {
  return (
    item.product.id === productId &&
    (item.selectedVariant?.value ?? undefined) === variantValue
  );
}

// ─── Derived totals ─────────────────────────────────────────────────────────

function derive(items: CartItem[]) {
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  const savings = items.reduce((sum, i) => {
    const orig = i.product.originalPrice ?? i.product.price;
    return sum + (orig - i.product.price) * i.quantity;
  }, 0);

  return { itemCount, subtotal, savings };
}

// ─── Store ─────────────────────────────────────────────────────────────────

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items:     [],
      itemCount: 0,
      subtotal:  0,
      savings:   0,

      addItem: (product, variant) =>
        set((state) => {
          const exists = state.items.find((i) =>
            matchesKey(i, product.id, variant?.value),
          );

          const items = exists
            ? state.items.map((i) =>
                matchesKey(i, product.id, variant?.value)
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              )
            : [...state.items, { product, quantity: 1, selectedVariant: variant }];

          return { items, ...derive(items) };
        }),

      removeItem: (productId, variantValue) =>
        set((state) => {
          const items = state.items.filter(
            (i) => !matchesKey(i, productId, variantValue),
          );
          return { items, ...derive(items) };
        }),

      updateQuantity: (productId, quantity, variantValue) =>
        set((state) => {
          const items =
            quantity <= 0
              ? state.items.filter((i) => !matchesKey(i, productId, variantValue))
              : state.items.map((i) =>
                  matchesKey(i, productId, variantValue)
                    ? { ...i, quantity }
                    : i,
                );
          return { items, ...derive(items) };
        }),

      clearCart: () =>
        set({ items: [], itemCount: 0, subtotal: 0, savings: 0 }),
    }),
    {
      name: "ws_cart",
      // Persist items only; derived values rehydrate on next action
      partialize: (state) => ({ items: state.items }),
      // Recompute derived values when hydrating from storage
      onRehydrateStorage: () => (state) => {
        if (state) {
          const { itemCount, subtotal, savings } = derive(state.items);
          state.itemCount = itemCount;
          state.subtotal  = subtotal;
          state.savings   = savings;
        }
      },
    },
  ),
);