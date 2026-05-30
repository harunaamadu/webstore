"use client";

import Link from "next/link";
import { memo, useState } from "react";
import { CaretDownIcon, CaretRightIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { sectionVariants } from "./variants";

// ─── Desktop Section ──────────────────────────────────────────

interface SectionProps {
  title: string;
  items: string[];
  onClose: () => void;
}

export const MenuSection = memo(({ title, items, onClose }: SectionProps) => (
  <motion.div variants={sectionVariants} className="space-y-3">
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>

      <div className="flex flex-col gap-1.5">
        {items.map((item) => (
          <Link
            key={item}
            href="/"
            onClick={onClose}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>

    <Link
      href="/"
      onClick={onClose}
      className="
        inline-flex items-center gap-1.5
        text-xs font-semibold uppercase tracking-wide
        text-muted-foreground transition-all
        hover:translate-x-1 hover:text-foreground
      "
    >
      View more
      <CaretRightIcon size={11} weight="bold" />
    </Link>
  </motion.div>
));

MenuSection.displayName = "MenuSection";

// ─── Mobile Accordion Section ─────────────────────────────────

interface MobileSectionProps {
  title: string;
  items: string[];
  onClose: () => void;
}

export const MobileSection = ({ title, items, onClose }: MobileSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-medium">{title}</span>

        <motion.span animate={{ rotate: expanded ? 180 : 0 }}>
          <CaretDownIcon size={16} />
        </motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex max-h-60 flex-col gap-3 overflow-y-auto pb-4">
              {items.map((item) => (
                <Link
                  key={item}
                  href="/"
                  onClick={onClose}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};