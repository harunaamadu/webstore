// components/ui/Dropdown.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDownIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownProps {
  label?: string | ReactNode;
  items: DropdownItem[];
  variant?: "default" | "icon" | "auth";
  /**
   * top-left  => menu opens bottom-left
   * top-right => menu opens bottom-right
   */
  anchor?:
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
  avatarSrc?: string;
  avatarAlt?: string;
  userName?: string;
  className?: string;
  menuClassName?: string;
  triggerClassName?: string;
}

const menuVariants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.98,

    transition: {
      duration: 0.15,
    },
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.18,
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },

  exit: {
    opacity: 0,
    y: 6,
    scale: 0.98,

    transition: {
      duration: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -6,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.16,
    },
  },
};

const caretVariants = {
  closed: {
    rotate: 0,
  },

  open: {
    rotate: 180,
  },
};

const Dropdown = ({
  label,
  items,
  variant = "default",
  anchor = "top-left",
  avatarSrc,
  avatarAlt = "Avatar",
  userName,
  className,
  menuClassName,
  triggerClassName,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          `
            flex items-center gap-2
            transition-colors duration-150
          `,

          variant === "default" &&
            `
              px-3 py-2
              text-sm font-medium
              text-neutral-700
              hover:bg-neutral-100
              hover:text-neutral-900
            `,

          variant === "icon" &&
            `
              size-10 items-center
              justify-center rounded-full
              text-neutral-700
              hover:bg-neutral-100
              hover:text-neutral-900
            `,

          variant === "auth" &&
            `
              px-2 py-1.5
              hover:bg-neutral-100
            `,

          triggerClassName,
        )}
      >
        {/* Default */}
        {variant === "default" && (
          <>
            <span>{label}</span>

            <motion.span
              variants={caretVariants}
              animate={open ? "open" : "closed"}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              className="
                flex items-center
                text-neutral-500
              "
            >
              <CaretDownIcon size={14} weight="bold" />
            </motion.span>
          </>
        )}
        {/* Icon */}
        {variant === "icon" && <span>{label}</span>}
        {/* Auth */}
        {variant === "auth" && (
          <>
            <div
              className="
                relative flex size-9
                items-center justify-center
                overflow-hidden rounded-full
                border border-neutral-200
                bg-neutral-100
              "
            >
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={avatarAlt}
                  fill
                  className="object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : null}

              {/* Fallback Initial */}
              <span
                className="
          text-sm font-semibold
          uppercase text-neutral-700
        "
              >
                {userName?.charAt(0) ?? "U"}
              </span>
            </div>

            {userName && (
              <div
                className="
          hidden flex-col
          text-left lg:flex
        "
              >
                <span
                  className="
            text-xs text-neutral-500
          "
                >
                  Welcome back
                </span>

                <span
                  className="
            text-sm font-medium
            text-neutral-900
          "
                >
                  {userName}
                </span>
              </div>
            )}

            <motion.span
              variants={caretVariants}
              animate={open ? "open" : "closed"}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              className="
        hidden items-center
        text-neutral-500 md:flex
      "
            >
              <CaretDownIcon size={14} weight="bold" />
            </motion.span>
          </>
        )}
      </button>

      {/* Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className={cn(
              `
                absolute
                z-50 min-w-56 overflow-hidden
                border border-neutral-200
                bg-white p-1
                shadow-xl
              `,
              anchor === "top-left" && "left-0 top-[calc(100%+8px)]",
              anchor === "bottom-left" && "left-0 bottom-[calc(100%+8px)]",
              anchor === "top-center" && "left-1/2 -translate-x-1/2 bottom-[calc(100%+8px)]",
              anchor === "top-right" && "right-0 top-[calc(100%+8px)]",
              anchor === "bottom-right" && "right-0 bottom-[calc(100%+8px)]",
              anchor === "bottom-center" && "left-1/2 -translate-x-1/2 bottom-[calc(100%+8px)]",
              menuClassName,
            )}
          >
            <motion.div className="flex flex-col">
              {items.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="
                      flex items-center
                      px-3 py-2
                      text-sm text-neutral-700
                      transition-colors duration-150
                      hover:bg-neutral-100
                      hover:text-neutral-900
                    "
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
