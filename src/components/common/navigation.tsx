"use client";

import { motion, Variants } from "framer-motion";
import Dropdown from "./customDropdown";
import React from "react";
import { navlinks } from "@/data/nav_data";

// Fix 1: delayChildren was 1 (1 full second) — changed to 0.1
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.07,
    },
  },
};

const linkVariants: Variants = {
  hidden:  { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Breakpoint config ────────────────────────────────────────────────────────
// How many nav links are shown inline (not in "More") per breakpoint:
//   ≥ 1280px  →  all 5 visible, "More" hidden
//   ≥ 1024px  →  4 visible, last 1 in "More"
//   ≥  768px  →  2 visible, last 3 in "More"
//   <  768px  →  nav hidden via md:flex

const getVisibleCount = (width: number): number => {
  if (width >= 1280) return navlinks.length;
  if (width >= 1024) return 4;
  return 2;
};

// ─── Component ────────────────────────────────────────────────────────────────

const Navigation = () => {
  const [visibleCount, setVisibleCount] = React.useState(navlinks.length);

  React.useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount(window.innerWidth));
    update(); // run immediately on mount
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Fix 2: original slice(-2, 6) sliced from the end — visibleItems always had wrong links
  const visibleItems = navlinks.slice(0, visibleCount);
  const moreItems    = navlinks.slice(visibleCount);

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="hidden md:flex items-center gap-1"
    >
      {visibleItems.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          variants={linkVariants}
          whileHover={{ y: -1 }}
          transition={{ duration: 0.15 }}
          className="
            relative px-2 py-1 whitespace-nowrap text-sm font-medium text-neutral-600
            after:absolute after:-bottom-0.5 after:left-0
            after:h-px after:w-0 after:bg-primary
            after:transition-all after:duration-200
            hover:text-neutral-900 hover:after:w-full
          "
        >
          {link.label}
        </motion.a>
      ))}

      {/* Fix 3: "More" only renders when there are actual overflow items */}
      {moreItems.length > 0 && (
        <motion.div variants={linkVariants}>
          <Dropdown
            variant="default"
            anchor="top-right"
            label="More"
            items={moreItems}
          />
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;