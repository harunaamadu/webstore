"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react"
import { menuVariants, itemVariants, checkVariants, caretVariants } from "./Variants"
import type { AnnouncementItem, AnnouncementOption } from "@/types"

type Props = {
  item: AnnouncementItem
}

export const AnnouncementDropdown = ({ item }: Props) => {
  const [open, setOpen]             = useState(false)
  const [selected, setSelected]     = useState<AnnouncementOption | null>(null)
  const containerRef                = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const displayLabel = selected?.label ?? item.select
  const displayIcon  = selected?.icon  ?? item.selectIcon

  return (
    <div ref={containerRef} className="relative">

      {/* ── Trigger ─────────────────────────────────────── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="
          flex items-center gap-1.5 px-2 py-1 rounded-sm
          text-neutral-600 hover:text-neutral-900
          hover:bg-neutral-300/60
          transition-colors duration-150 cursor-pointer select-none
        "
      >
        <span className="text-neutral-500 flex items-center">
          {displayIcon}
        </span>

        <span className="text-xs font-medium tracking-wide">
          {displayLabel}
        </span>

        <motion.span
          variants={caretVariants}
          animate={open ? "open" : "closed"}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="text-neutral-400 flex items-center"
        >
          <CaretDownIcon size={10} weight="bold" />
        </motion.span>
      </button>

      {/* ── Menu ────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              absolute top-[calc(100%+4px)] right-0 z-50
              min-w-50 py-1
              bg-white border border-neutral-200
              rounded-md shadow-md shadow-neutral-200/80
              overflow-hidden
            "
          >
            {item.options.map((option) => {
              const isActive = selected?.label === option.label

              return (
                <motion.li key={option.label} variants={itemVariants} role="option" aria-selected={isActive}>
                  <button
                    onClick={() => {
                      setSelected(option)
                      setOpen(false)
                    }}
                    className="
                      w-full flex items-center justify-between gap-2
                      px-3 py-1.5 text-xs
                      text-neutral-700 hover:text-neutral-900
                      hover:bg-neutral-100
                      transition-colors duration-100 cursor-pointer
                    "
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-neutral-400">{option.icon}</span>
                      {option.label}
                    </span>

                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          variants={checkVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="text-neutral-500"
                        >
                          <CheckIcon size={10} weight="bold" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}