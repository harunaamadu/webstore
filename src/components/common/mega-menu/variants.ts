import type { Variants } from "framer-motion";

export const desktopContainerVariants: Variants = {
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
    transition: { duration: 0.16, ease: "easeIn" },
  },
};

export const mobileSidebarVariants: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.22, ease: "easeInOut" },
  },
};

export const contentPanelVariants: Variants = {
  hidden: { opacity: 0, x: 10 },
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
    transition: { duration: 0.12 },
  },
};

export const sectionVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.18 } },
};