"use client";

import React from "react";
import { MegaMenuTrigger } from "./mega-menu";
import AuthButton from "./authButton";
import { Button } from "../ui/button";
import {
  BellIcon,
  ListIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { useHideOnScrollMobile, useScrolled } from "@/hooks";
import { useSearchStore } from "@/store/search.store";

// Shared props for every bottom nav button
const navButtonProps = {
  variant: "ghost",
  size: "icon-lg",
  className: "flex-col gap-1 px-4 font-medium text-[10px]",
} as const;

const BottomNav = () => {
  const navRef   = React.useRef<HTMLElement>(null);
  const scrolled = useScrolled(20);
  const { openSearch } = useSearchStore();

  useHideOnScrollMobile(navRef, 120);

  return (
    <nav
      ref={navRef}
      className={cn(
        `
          fixed bottom-0 left-1/2! -translate-x-1/2!
          z-40 lg:hidden
          flex items-center justify-evenly
          w-sm max-w-full
          py-2
          border border-b-transparent
          transition-all duration-300 will-change-transform
        `,
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-background/60"
      )}
    >
      <MegaMenuTrigger />

      {/* Search — opens the global search panel via the store */}
      <Button
        {...navButtonProps}
        onClick={openSearch}
        aria-label="Open search"
      >
        <MagnifyingGlassIcon size={20} />
        <span>Search</span>
      </Button>

      <AuthButton anchor="bottom-center" />

      <Button {...navButtonProps} aria-label="Alerts">
        <BellIcon size={20} />
        <span>Alert</span>
      </Button>

      <Button {...navButtonProps} aria-label="Menu">
        <ListIcon size={20} />
        <span>Menu</span>
      </Button>
    </nav>
  );
};

export default BottomNav;