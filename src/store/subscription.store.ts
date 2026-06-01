import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Types ──────────────────────────────────────────────────────────────────

export type SubscriptionPreference =
  | "new-arrivals"
  | "deals"
  | "member-offers"
  | "trending"
  | "restocks";

export interface SubscriptionEntry {
  email: string;
  preferences: SubscriptionPreference[];
  subscribedAt: string; // ISO string
}

interface SubscriptionState {
  subscriptions: SubscriptionEntry[];
  /** Returns the entry for a given email, or undefined */
  getSubscription: (email: string) => SubscriptionEntry | undefined;
  /** Returns true if the email is already subscribed */
  isSubscribed: (email: string) => boolean;
  /** Adds or updates a subscription */
  subscribe: (email: string, preferences: SubscriptionPreference[]) => void;
  /** Removes a subscription */
  unsubscribe: (email: string) => void;
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      subscriptions: [],

      getSubscription: (email) =>
        get().subscriptions.find(
          (s) => s.email.toLowerCase() === email.toLowerCase()
        ),

      isSubscribed: (email) =>
        get().subscriptions.some(
          (s) => s.email.toLowerCase() === email.toLowerCase()
        ),

      subscribe: (email, preferences) => {
        set((state) => {
          const existing = state.subscriptions.findIndex(
            (s) => s.email.toLowerCase() === email.toLowerCase()
          );
          const entry: SubscriptionEntry = {
            email: email.toLowerCase(),
            preferences,
            subscribedAt:
              existing >= 0
                ? state.subscriptions[existing].subscribedAt
                : new Date().toISOString(),
          };

          if (existing >= 0) {
            const updated = [...state.subscriptions];
            updated[existing] = entry;
            return { subscriptions: updated };
          }

          return { subscriptions: [...state.subscriptions, entry] };
        });
      },

      unsubscribe: (email) =>
        set((state) => ({
          subscriptions: state.subscriptions.filter(
            (s) => s.email.toLowerCase() !== email.toLowerCase()
          ),
        })),
    }),
    { name: "webstore-subscriptions" }
  )
);