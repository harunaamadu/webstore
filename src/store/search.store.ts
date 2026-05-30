import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockProducts } from "@/data";
import { Product } from "@/types";

// ─── Constants ─────────────────────────────────────────────────────────────

const HISTORY_KEY = "ws_search_history";
const MAX_HISTORY = 8;

// ─── Types ─────────────────────────────────────────────────────────────────

interface SearchState {
  /** Whether the search panel is visible */
  isOpen: boolean;
  /** Current live query string */
  query: string;
  /** Persisted search history terms */
  history: string[];
  /** Derived results — recomputed whenever query changes */
  results: Product[];

  // Actions
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (query: string) => void;
  commitSearch: (term: string) => void;
  removeHistoryItem: (term: string) => void;
  clearHistory: () => void;
}

// ─── Search util ───────────────────────────────────────────────────────────

function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)),
  );
}

// ─── Store ─────────────────────────────────────────────────────────────────

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      isOpen: false,
      query: "",
      history: [],
      results: [],

      openSearch:  () => set({ isOpen: true }),
      closeSearch: () => set({ isOpen: false }),

      setQuery: (query) =>
        set({ query, results: searchProducts(query) }),

      commitSearch: (term) => {
        if (!term.trim()) return;
        set((state) => ({
          history: [
            term,
            ...state.history.filter((h) => h !== term),
          ].slice(0, MAX_HISTORY),
        }));
      },

      removeHistoryItem: (term) =>
        set((state) => ({
          history: state.history.filter((h) => h !== term),
        })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: HISTORY_KEY,
      // Only history is persisted — everything else is session-only
      partialize: (state) => ({ history: state.history }),
    },
  ),
);