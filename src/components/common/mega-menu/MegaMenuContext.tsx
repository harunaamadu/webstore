"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import type { RefObject } from "react";

interface MegaMenuContextValue {
  open: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: RefObject<HTMLDivElement | null>;
}

const MegaMenuContext = createContext<MegaMenuContextValue | null>(null);

export const useMegaMenu = () => {
  const ctx = useContext(MegaMenuContext);
  if (!ctx) throw new Error("useMegaMenu must be used inside <MegaMenuProvider>");
  return ctx;
};

export const MegaMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggle   = useCallback(() => setOpen((o) => !o), []);
  const close    = useCallback(() => setOpen(false), []);

  return (
    <MegaMenuContext.Provider value={{ open, toggle, close, triggerRef }}>
      {children}
    </MegaMenuContext.Provider>
  );
};