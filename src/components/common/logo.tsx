// components/common/Logo.tsx

"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface LogoProps {
  firstText?: string;
  secondText?: string;
  href?: string;
  className?: string;
}

const splitTextVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 12,
    filter: "blur(8px)",
  }),
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.35,
      delay: index * 0.05,
      ease: "easeOut",
    },
  }),
};

const Logo = ({
  firstText = "web",
  secondText = "store",
  href = "/",
  className = "",
}: LogoProps) => {
  const firstWord = firstText.split("");
  const secondWord = secondText.split("");

  return (
    <motion.div initial="hidden" animate="visible" whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className={`flex items-center overflow-hidden font-heading text-xl md:text-2xl font-semibold uppercase text-shadow-accent ${className}`}
      >
        <span className="flex">
          {firstWord.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              custom={index}
              variants={splitTextVariants}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>

        <span className="flex text-primary">
          {secondWord.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              custom={index + firstWord.length}
              variants={splitTextVariants}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      </Link>
    </motion.div>
  );
};

export default Logo;
