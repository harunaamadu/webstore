"use client";

import { memo, useMemo, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CaretRightIcon, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { menuData, sidebarItems } from "@/data/nav_data";
import { useMegaMenu } from "./MegaMenuContext";
import { MenuSection, MobileSection } from "./MenuSections";
import {
  desktopContainerVariants,
  mobileSidebarVariants,
  contentPanelVariants,
} from "./variants";

const MegaMenuPanel = () => {
  const { open, close, triggerRef } = useMegaMenu();
  const [activeTab, setActiveTab] = useState(sidebarItems[0] ?? "Art & Crafts");

  // Fix: ref for the panel itself so click-outside can exclude it
  const panelRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const activeMenu = useMemo(
    () => menuData.find((item) => item.category === activeTab),
    [activeTab],
  );

  // Fix: handler now ignores clicks inside the trigger OR inside the panel/drawer
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      if (drawerRef.current?.contains(target)) return;
      close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, close, triggerRef]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  // Close on scroll > 20px
  useEffect(() => {
    if (!open) return;
    const startY = window.scrollY;
    const handler = () => { if (Math.abs(window.scrollY - startY) > 20) close(); };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Mobile overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
          />

          {/* Desktop dropdown */}
          <motion.div
            ref={panelRef}
            variants={desktopContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              absolute left-1/2 top-full z-50
              mx-auto hidden
              w-[calc(100vw-2rem)] min-w-160 max-w-6xl
              -translate-x-1/2
              overflow-hidden
              border border-x-0
              bg-background shadow-xl
              lg:grid lg:grid-cols-[260px_1fr]
            "
          >
            <aside className="border-r border-border bg-muted/50 py-3">
              <div className="flex flex-col">
                {sidebarItems.map((item) => (
                  <button
                    key={item}
                    onMouseEnter={() => setActiveTab(item)}
                    onClick={() => setActiveTab(item)}
                    className={cn(
                      `
                        relative flex items-center justify-between
                        px-5 py-2.5 text-left text-sm font-medium
                        transition-all hover:bg-background
                      `,
                      activeTab === item &&
                        "bg-background text-primary after:absolute after:left-0 after:h-full after:w-0.75 after:bg-primary",
                    )}
                  >
                    <span className="flex-1">{item}</span>
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

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={contentPanelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="my-auto h-150 max-h-full overflow-y-auto p-8"
              >
                {activeMenu ? (
                  <div className="grid gap-8 md:grid-cols-3">
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
                  <div className="flex h-full items-center justify-center py-16">
                    <p className="text-sm text-muted-foreground">No category selected</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Mobile drawer */}
          <motion.div
            ref={drawerRef}
            variants={mobileSidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed left-0 top-0 z-50
              flex h-screen w-full max-w-sm
              flex-col overflow-hidden
              bg-background shadow-2xl
              lg:hidden
            "
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-lg font-semibold">Categories</h2>
              <Button size="icon" variant="ghost" onClick={close}>
                <X size={18} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-5">
              {menuData.map((menu) => (
                <div key={menu.category} className="border-b border-border">
                  <div className="py-4">
                    <h3 className="text-base font-semibold">{menu.category}</h3>
                  </div>
                  <div className="pb-4">
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
  );
};

export default memo(MegaMenuPanel);