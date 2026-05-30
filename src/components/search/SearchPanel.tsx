"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CaretLeftIcon,
  ClockCounterClockwiseIcon,
  FadersHorizontalIcon,
  MagnifyingGlassIcon,
  TrendUpIcon,
  XIcon,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductCard from "@/components/product/ProductCard";
import { useSearchStore } from "@/store/search.store";

// ─── Mock trending ─────────────────────────────────────────────────────────

const TRENDING = [
  "AirPods Pro",
  "Sony headphones",
  "Gaming console",
  "Nike sneakers",
  "Instant Pot",
  "Dyson vacuum",
];

// ─── SearchPanel ───────────────────────────────────────────────────────────

interface SearchPanelProps {
  open: boolean;
  onClose: () => void;
}

const SearchPanel = ({ open, onClose }: SearchPanelProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    query,
    history,
    results,
    setQuery,
    commitSearch,
    removeHistoryItem,
    clearHistory,
  } = useSearchStore();

  // ── Lock body scroll while open ──────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // ── Focus input on open ──────────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  // ── Escape to close ──────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    commitSearch(query);
  };

  const handleTermClick = useCallback(
    (term: string) => {
      setQuery(term);
      commitSearch(term);
      inputRef.current?.focus();
    },
    [setQuery, commitSearch],
  );

  const hasQuery   = query.trim().length > 0;
  const hasHistory = history.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-panel"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-200 flex flex-col bg-background"
        >
          {/* ── Top bar ────────────────────────────────────────────────── */}
          <div className="mx-auto w-full max-w-360 px-4 md:px-8">
            <div className="flex items-center justify-between py-4">
              <Button variant="ghost" size="icon-lg" onClick={onClose} aria-label="Go back">
                <CaretLeftIcon size={22} />
              </Button>
              <h3 className="font-heading text-xl font-semibold uppercase tracking-wide">
                Search
              </h3>
              <Button variant="ghost" size="icon-lg" aria-label="Filters">
                <FadersHorizontalIcon size={22} />
              </Button>
            </div>

            {/* ── Input ────────────────────────────────────────────────── */}
            <form onSubmit={handleSubmit}>
              <Field className="relative flex flex-row flex-wrap items-center gap-y-4">
                <FieldLabel
                  htmlFor="search-input"
                  className="flex aspect-square h-10 w-fit! cursor-pointer items-center justify-center"
                >
                  <MagnifyingGlassIcon size={22} className="text-muted-foreground" />
                </FieldLabel>

                <Input
                  ref={inputRef}
                  id="search-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Product name, brand, category…"
                  className="h-10 flex-1 border-transparent border-b-border text-lg caret-primary outline-none focus-visible:border-transparent focus-visible:border-b-primary focus-visible:ring-transparent"
                  autoComplete="off"
                  spellCheck={false}
                />

                <div className="flex items-center gap-1 w-fit!">
                  {hasQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setQuery("")}
                      aria-label="Clear input"
                    >
                      <XIcon size={14} />
                    </Button>
                  )}
                  <Kbd className="hidden aspect-square h-8 w-fit! sm:flex">/</Kbd>
                </div>

                <FieldDescription className="mt-1 min-w-full flex-auto truncate">
                  {hasQuery
                    ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
                    : "Type to search products, brands, or categories"}
                </FieldDescription>
              </Field>
            </form>

            <div className="mt-4 h-px w-full bg-border" />
          </div>

          {/* ── Scrollable body ───────────────────────────────────────────── */}
          <ScrollArea className="flex-1 max-h-full">
            <div className="mx-auto w-full max-w-360 px-4 md:px-8 block min-h-max py-6 pb-50">
              <AnimatePresence mode="wait">

                {/* ── Results ─────────────────────────────────────────── */}
                {hasQuery ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                  >
                    {results.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {results.map((product, i) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: Math.min(i * 0.04, 0.32) }}
                            onClick={() => commitSearch(query)}
                          >
                            <ProductCard product={product} variant="default" />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center gap-3 py-20 text-center"
                      >
                        <div className="flex size-14 items-center justify-center border border-dashed border-border">
                          <MagnifyingGlassIcon size={24} className="text-muted-foreground" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          No results for &ldquo;{query}&rdquo;
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Try a different keyword or browse by category.
                        </p>
                        <Button variant="outline" size="sm" onClick={() => setQuery("")}>
                          Clear search
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>

                ) : hasHistory ? (
                  /* ── History ────────────────────────────────────────── */
                  <motion.div
                    key="history"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          <ClockCounterClockwiseIcon size={13} />
                          Recent Searches
                        </div>
                        <button
                          onClick={clearHistory}
                          className="text-[10px] text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
                        >
                          Clear all
                        </button>
                      </div>

                      <div className="flex flex-col divide-y divide-border">
                        {history.map((term) => (
                          <button
                            key={term}
                            onClick={() => handleTermClick(term)}
                            className="group flex items-center justify-between py-2.5 text-left transition-colors hover:text-primary"
                          >
                            <div className="flex items-center gap-3">
                              <ClockCounterClockwiseIcon size={14} className="shrink-0 text-muted-foreground" />
                              <span className="text-sm">{term}</span>
                            </div>
                            <XIcon
                              size={12}
                              className="text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeHistoryItem(term);
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <TrendingSection onTermClick={handleTermClick} />
                  </motion.div>

                ) : (
                  /* ── Empty history ───────────────────────────────────── */
                  <motion.div
                    key="empty-history"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                      <div className="flex size-14 items-center justify-center border border-dashed border-border">
                        <ClockCounterClockwiseIcon size={24} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          No search history yet
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Your recent searches will appear here. Start typing above.
                        </p>
                      </div>
                    </div>

                    <TrendingSection onTermClick={handleTermClick} />
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Trending section (shared between history + empty states) ──────────────

const TrendingSection = ({ onTermClick }: { onTermClick: (term: string) => void }) => (
  <div>
    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
      <TrendUpIcon size={13} />
      Trending Now
    </div>
    <div className="flex flex-wrap gap-2">
      {TRENDING.map((term) => (
        <button
          key={term}
          onClick={() => onTermClick(term)}
          className="border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
        >
          {term}
        </button>
      ))}
    </div>
  </div>
);

export default SearchPanel;