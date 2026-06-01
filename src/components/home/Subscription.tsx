"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EnvelopeIcon,
  CheckCircleIcon,
  SparkleIcon,
  TagIcon,
  StarIcon,
  FireIcon,
  ArrowCounterClockwiseIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { appToast } from "@/hooks/useToast";
import {
  useSubscriptionStore,
  type SubscriptionPreference,
} from "@/store/subscription.store";
import { StaggerReveal } from "../animations/reveal";

// ─── Types ───────────────────────────────────────────────────────────────────

type UserRole = "admin" | "customer" | "seller" | "guest";

interface User {
  email?: string | null;
  role?: UserRole;
}

interface SubscriptionProps {
  user?: User | null;
}

// ─── Preference config ────────────────────────────────────────────────────────

const PREFERENCES: {
  value: SubscriptionPreference;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "new-arrivals",
    label: "New Arrivals",
    description: "Be the first to know about new products",
    icon: <SparkleIcon size={14} weight="duotone" />,
  },
  {
    value: "deals",
    label: "Deals & Sales",
    description: "Flash sales, daily deals, and discounts",
    icon: <TagIcon size={14} weight="duotone" />,
  },
  {
    value: "member-offers",
    label: "Member Offers",
    description: "Exclusive perks for registered members",
    icon: <StarIcon size={14} weight="duotone" />,
  },
  {
    value: "trending",
    label: "Trending Now",
    description: "What everyone's buying this week",
    icon: <FireIcon size={14} weight="duotone" />,
  },
  {
    value: "restocks",
    label: "Restocks",
    description: "Alerts when sold-out items are back",
    icon: <ArrowCounterClockwiseIcon size={14} weight="duotone" />,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// ─── Component ────────────────────────────────────────────────────────────────

const Subscription: React.FC<SubscriptionProps> = ({ user }) => {
  const [email, setEmail] = useState(user?.email ?? "");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [prefError, setPrefError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // Default: all preferences selected
  const [selected, setSelected] = useState<Set<SubscriptionPreference>>(
    new Set(PREFERENCES.map((p) => p.value)),
  );

  const { subscribe, isSubscribed } = useSubscriptionStore();
  const isLoggedIn = !!user?.email;
  const alreadySubscribed = isSubscribed(email);

  // ── Preference toggle ────────────────────────────────────────────────────
  const togglePref = (value: SubscriptionPreference) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
    setPrefError(null);
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    setEmailError(null);
    setPrefError(null);

    // Validate email (only needed when not logged in)
    if (!isLoggedIn) {
      if (!email) {
        setEmailError("Email is required");
        appToast.error("Validation error", "Email is required");
        return;
      }
      if (!isValidEmail(email)) {
        setEmailError("Please enter a valid email address");
        appToast.error("Invalid email", "Please enter a valid email address");
        return;
      }
    }

    // Validate preferences
    if (selected.size === 0) {
      setPrefError("Pick at least one preference");
      appToast.error("No preferences", "Select at least one topic to continue");
      return;
    }

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 800));

      subscribe(email || user?.email || "", Array.from(selected));

      setDone(true);
      appToast.success(
        "Subscribed ✉",
        "You've successfully joined our newsletter.",
      );
    } catch (err: any) {
      appToast.error(
        "Subscription failed",
        err?.message ?? "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ─── Success state ────────────────────────────────────────────────────────
  if (done || alreadySubscribed) {
    return (
      <section className="mx-auto w-full max-w-360 px-4 py-10 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center gap-4 bg-muted/30 p-10 text-center"
        >
          <div className="flex size-12 items-center justify-center border border-primary/30 bg-primary/10">
            <CheckCircleIcon size={24} className="text-primary" weight="fill" />
          </div>
          <div>
            <p className="text-base font-semibold">You're subscribed!</p>
            <p className="mt-1 text-xs text-muted-foreground">
              We'll send updates to{" "}
              <span className="font-medium text-foreground">
                {email || user?.email}
              </span>
              .
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {Array.from(selected).map((pref) => {
              const match = PREFERENCES.find((p) => p.value === pref);
              return match ? (
                <span
                  key={pref}
                  className="flex items-center gap-1.5 border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-medium text-primary"
                >
                  {match.icon}
                  {match.label}
                </span>
              ) : null;
            })}
          </div>
        </motion.div>
      </section>
    );
  }

  // ─── Main form ────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto w-full max-w-360 px-4 py-10 md:px-8">
      <StaggerReveal
        stagger={0.08}
        variant="blur"
        direction="up"
        as="div"
        itemAs="div"
        className={`grid gap-0 md:grid-cols-2 lg:grid-cols-[480px_1fr]`}
      >
        {/* ── Left panel — copy ───────────────────────────────────────── */}
        <div className="hidden md:flex flex-col justify-center gap-4 border-b border-border bg-muted/30 p-8 md:border-b-0 md:border-r md:p-10">
          <div className="flex size-10 items-center justify-center bg-background">
            <EnvelopeIcon size={18} className="text-primary" weight="duotone" />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Newsletter
            </p>
            <h2 className="mt-1.5 text-2xl font-semibold tracking-tight md:text-3xl">
              Stay in the loop
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Get updates on new arrivals, exclusive deals, and member‑only
              offers — delivered straight to your inbox.
            </p>
          </div>

          {/* Subscriber count decoration */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex -space-x-2">
              {[
                "bg-amber-400",
                "bg-emerald-400",
                "bg-blue-400",
                "bg-rose-400",
              ].map((color, i) => (
                <div
                  key={i}
                  className={`size-6 rounded-full border-2 border-background ${color}`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">12,400+</span>{" "}
              subscribers
            </p>
          </div>
        </div>

        {/* ── Right panel — form ──────────────────────────────────────── */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 p-8 md:p-10"
        >
          {/* Email field — only shown when not logged in */}
          {!isLoggedIn && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">
                Email address
              </label>
              <div className="relative">
                <EnvelopeIcon
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="email"
                  value={email}
                  placeholder="you@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(null);
                  }}
                  className={cn(
                    "h-9 w-full border bg-background py-3 pl-8 pr-3 text-xs outline-none transition-colors focus:border-primary",
                    emailError ? "border-destructive" : "border-border",
                  )}
                />
              </div>
              <AnimatePresence>
                {emailError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-[10px] font-medium text-destructive"
                  >
                    {emailError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Logged-in email display */}
          {isLoggedIn && (
            <div className="flex items-center gap-2 bg-muted/40 px-3 py-2.5">
              <EnvelopeIcon
                size={13}
                className="shrink-0 text-muted-foreground"
              />
              <span className="text-xs text-muted-foreground">
                Subscribing as{" "}
                <span className="font-medium text-foreground">
                  {user?.email}
                </span>
              </span>
            </div>
          )}

          {/* Preferences */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-foreground">
                I'm interested in
              </label>
              <button
                type="button"
                onClick={() =>
                  setSelected(
                    selected.size === PREFERENCES.length
                      ? new Set()
                      : new Set(PREFERENCES.map((p) => p.value)),
                  )
                }
                className="text-[10px] font-medium text-muted-foreground underline-offset-2 hover:text-primary hover:underline transition-colors"
              >
                {selected.size === PREFERENCES.length
                  ? "Deselect all"
                  : "Select all"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-1.5">
              {PREFERENCES.map((pref) => {
                const checked = selected.has(pref.value);
                return (
                  <label
                    key={pref.value}
                    className={cn(
                      "flex cursor-pointer select-none items-center gap-3 px-3 py-2 transition-colors",
                      checked ? "text-primary" : "",
                    )}
                  >
                    {/* Custom checkbox */}
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center border transition-colors",
                        checked
                          ? "border-primary bg-primary"
                          : "border-input bg-background",
                      )}
                    >
                      <AnimatePresence>
                        {checked && (
                          <motion.svg
                            key="check"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            viewBox="0 0 10 10"
                            className="size-2.5"
                            fill="none"
                          >
                            <path
                              d="M2 5l2.5 2.5L8 3"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary-foreground"
                            />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </span>

                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => togglePref(pref.value)}
                    />

                    {/* Icon + text */}
                    <span
                      className={cn(
                        "flex items-center gap-2 transition-colors",
                        checked ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {pref.icon}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-xs font-medium text-foreground">
                        {pref.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {pref.description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>

            <AnimatePresence>
              {prefError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-[10px] font-medium text-destructive"
                >
                  {prefError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "flex h-9 items-center justify-center gap-2 border border-primary bg-primary px-6 text-xs font-semibold text-primary-foreground transition-all",
              "hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {loading ? (
              <>
                <span className="size-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Subscribing...
              </>
            ) : (
              <>
                <EnvelopeIcon size={13} weight="bold" />
                Subscribe
              </>
            )}
          </button>

          <p className="text-[10px] text-muted-foreground">
            No spam, ever. Unsubscribe at any time.
            {user?.role && (
              <>
                {" · "}
                Signed in as <span className="capitalize">{user.role}</span>
              </>
            )}
          </p>
        </form>
      </StaggerReveal>
    </div>
  );
};

export default Subscription;
