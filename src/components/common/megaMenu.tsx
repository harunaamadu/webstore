// components/layout/header/MegaMenu.tsx

"use client";

import Link from "next/link";

import { useState, useRef, useEffect, memo, useMemo } from "react";

import { Button } from "@/components/ui/button";

import {
  CaretDownIcon,
  CaretRightIcon,
  Layout,
  X,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

import { motion, AnimatePresence, Variants } from "framer-motion";

import { menuData, sidebarItems } from "@/data/nav_data";

// ─────────────────────────────────────────────────────────────
// Variants
// ─────────────────────────────────────────────────────────────

const desktopContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    scaleY: 0.96,
    y: -6,
    transformOrigin: "top center",
  },

  visible: {
    opacity: 1,
    scaleY: 1,
    y: 0,

    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },

  exit: {
    opacity: 0,
    scaleY: 0.96,
    y: -4,

    transition: {
      duration: 0.16,
      ease: "easeIn",
    },
  },
};

const mobileSidebarVariants: Variants = {
  hidden: {
    x: "-100%",
  },

  visible: {
    x: 0,

    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },

  exit: {
    x: "-100%",

    transition: {
      duration: 0.22,
      ease: "easeInOut",
    },
  },
};

const contentPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 10,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.18,
      ease: "easeOut",
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },

  exit: {
    opacity: 0,
    x: 10,

    transition: {
      duration: 0.12,
    },
  },
};

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -8,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.18,
    },
  },
};

// ─────────────────────────────────────────────────────────────
// Desktop Section
// ─────────────────────────────────────────────────────────────

interface SectionProps {
  title: string;

  items: string[];

  onClose: () => void;
}

const MenuSection = memo(({ title, items, onClose }: SectionProps) => (
  <motion.div variants={sectionVariants} className="space-y-3">
    <div className="space-y-2">
      <h3
        className="
            text-sm font-bold
            text-foreground
          "
      >
        {title}
      </h3>

      <div className="flex flex-col gap-1.5">
        {items.map((item) => (
          <Link
            key={item}
            href="/"
            onClick={onClose}
            className="
                text-sm
                text-muted-foreground
                transition-colors
                hover:text-foreground
              "
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
          text-xs font-semibold
          uppercase tracking-wide
          text-muted-foreground
          transition-all
          hover:translate-x-1
          hover:text-foreground
        "
    >
      View more
      <CaretRightIcon size={11} weight="bold" />
    </Link>
  </motion.div>
));

MenuSection.displayName = "MenuSection";

// ─────────────────────────────────────────────────────────────
// Mobile Accordion
// ─────────────────────────────────────────────────────────────

interface MobileSectionProps {
  title: string;

  items: string[];

  onClose: () => void;
}

const MobileSection = ({ title, items, onClose }: MobileSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="
        border-b border-border
      "
    >
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="
          flex w-full items-center
          justify-between py-4
          text-left
        "
      >
        <span
          className="
            text-sm font-medium
          "
        >
          {title}
        </span>

        <motion.span
          animate={{
            rotate: expanded ? 180 : 0,
          }}
        >
          <CaretDownIcon size={16} />
        </motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              overflow-hidden
            "
          >
            <div
              className="
                flex max-h-60
                flex-col gap-3
                overflow-y-auto
                pb-4
              "
            >
              {items.map((item) => (
                <Link
                  key={item}
                  href="/"
                  onClick={onClose}
                  className="
                    text-sm
                    text-muted-foreground
                    transition-colors
                    hover:text-foreground
                  "
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

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

const MegaMenu = () => {
  const [open, setOpen] = useState(false);

  const [activeTab, setActiveTab] = useState(sidebarItems[0] ?? "Art & Crafts");

  const containerRef = useRef<HTMLDivElement>(null);

  const activeMenu = useMemo(
    () => menuData.find((item) => item.category === activeTab),

    [activeTab],
  );

  const close = () => setOpen(false);

  // Outside click
  useEffect(() => {
    if (!open) return;

    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Escape
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Close on scroll
  useEffect(() => {
    if (!open) return;

    let startY = window.scrollY;

    const handleScroll = () => {
      const diff = Math.abs(window.scrollY - startY);

      if (diff > 20) {
        close();
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  return (
    <>
      <div ref={containerRef}>
        {/* Trigger */}
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={open}
          className="
          gap-2 px-4
          font-medium
        "
        >
          <motion.span
            animate={{
              rotate: open ? 90 : 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="
            flex items-center
          "
          >
            {open ? <X size={20} /> : <Layout size={20} />}
          </motion.span>
          All
        </Button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Mobile Overlay */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="
                fixed inset-0 z-40
                bg-black/40
                backdrop-blur-[2px]
                lg:hidden
              "
            />

            {/* Desktop */}
            <motion.div
              variants={desktopContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
                absolute left-1/2
                top-full z-50
                mx-auto hidden
                w-[calc(100vw-2rem)]
                min-w-160 max-w-6xl
                -translate-x-1/2
                overflow-hidden
                border border-x-0
                bg-background
                shadow-xl
                lg:grid
                lg:grid-cols-[260px_1fr]
              "
            >
              {/* Sidebar */}
              <aside
                className="
                  border-r border-border
                  bg-muted/50 py-3
                "
              >
                <div
                  className="
                    flex flex-col
                  "
                >
                  {sidebarItems.map((item) => (
                    <button
                      key={item}
                      onMouseEnter={() => setActiveTab(item)}
                      onClick={() => setActiveTab(item)}
                      className={cn(
                        `
                            relative flex
                            items-center
                            justify-between
                            px-5 py-2.5
                            text-left text-sm
                            font-medium
                            transition-all
                            hover:bg-background
                          `,

                        activeTab === item &&
                          `
                              bg-background
                              text-primary
                              after:absolute
                              after:left-0
                              after:h-full
                              after:w-0.75
                              after:bg-primary
                            `,
                      )}
                    >
                      <span
                        className="
                            flex-1
                          "
                      >
                        {item}
                      </span>

                      <motion.span
                        animate={{
                          x: activeTab === item ? 2 : 0,

                          opacity: activeTab === item ? 1 : 0.3,
                        }}
                      >
                        <CaretRightIcon size={13} />
                      </motion.span>
                    </button>
                  ))}
                </div>
              </aside>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={contentPanelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="
                    my-auto h-150
                    max-h-full
                    overflow-y-auto
                    p-8
                  "
                >
                  {activeMenu ? (
                    <div
                      className="
                        grid gap-8
                        md:grid-cols-3
                      "
                    >
                      {activeMenu.sections.map((section) => (
                        <MenuSection
                          key={section.title}
                          title={section.title}
                          items={section.items}
                          onClose={close}
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      className="
                        flex h-full
                        items-center
                        justify-center
                        py-16
                      "
                    >
                      <p
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >
                        No category selected
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Mobile */}
            <motion.div
              variants={mobileSidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
                fixed left-0 top-0
                z-50 flex h-screen
                w-full max-w-sm
                flex-col
                overflow-hidden
                bg-background
                shadow-2xl
                lg:hidden
              "
            >
              {/* Header */}
              <div
                className="
                  flex items-center
                  justify-between
                  border-b border-border
                  px-5 py-4
                "
              >
                <h2
                  className="
                    text-lg font-semibold
                  "
                >
                  Categories
                </h2>

                <Button size="icon" variant="ghost" onClick={close}>
                  <X size={18} />
                </Button>
              </div>

              {/* Scrollable Content */}
              <div
                className="
                  flex-1 overflow-y-auto
                  px-5
                "
              >
                {menuData.map((menu) => (
                  <div
                    key={menu.category}
                    className="
                      border-b border-border
                    "
                  >
                    <div
                      className="
                        py-4
                      "
                    >
                      <h3
                        className="
                          text-base
                          font-semibold
                        "
                      >
                        {menu.category}
                      </h3>
                    </div>

                    <div
                      className="
                        pb-4
                      "
                    >
                      {menu.sections.map((section) => (
                        <MobileSection
                          key={section.title}
                          title={section.title}
                          items={section.items}
                          onClose={close}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(MegaMenu);
