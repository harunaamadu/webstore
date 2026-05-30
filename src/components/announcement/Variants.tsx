import type { Variants } from "framer-motion"

export const menuVariants: Variants = {
  hidden: {
    opacity: 0,
    scaleY: 0.85,
    y: -4,
    transformOrigin: "top center",
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    y: 0,
    transformOrigin: "top center",
    transition: {
      duration: 0.18,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.04,
      delayChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0.9,
    y: -4,
    transformOrigin: "top center",
    transition: { duration: 0.13, ease: "easeIn" },
  },
}

export const itemVariants: Variants = {
  hidden:  { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.15 } },
}

export const checkVariants: Variants = {
  hidden:  { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.15 } },
  exit:    { scale: 0, opacity: 0, transition: { duration: 0.1 } },
}

export const caretVariants = {
  open:   { rotate: 180 },
  closed: { rotate: 0 },
}