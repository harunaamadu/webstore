"use client";

import * as React from "react";

import { useHideOnScroll, useScrolled } from "@/hooks";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

import { Announcement } from "../announcement";
import { Logo, Navigation } from "../common";
import HeaderAction from "../common/headerAction";
import {
  MegaMenuPanel,
  MegaMenuProvider,
  MegaMenuTrigger,
} from "../common/mega-menu";
import BottomNav from "../common/bottomNav";
import SearchPanel from "../search/SearchPanel";
import { useSearchStore } from "@/store/search.store";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const navRef = React.useRef<HTMLElement>(null);

  const scrolled = useScrolled();
  useHideOnScroll(navRef, 120);

  // Search state lives in the store — any component can open/close it
  const { isOpen, closeSearch } = useSearchStore();

  return (
    <>
      <Announcement />

      <SearchPanel open={isOpen} onClose={closeSearch} />

      <MegaMenuProvider>
        <header
          ref={navRef}
          className="sticky top-0 left-0 right-0 z-40 will-change-transform"
        >
          <MegaMenuPanel />

          <div
            className={cn(
              "sticky top-0 flex items-center justify-between gap-4 md:gap-12 max-w-360 mx-auto p-4 px-6 md:px-8 bg-background",
              scrolled
                ? "bg-background/75 shadow-[0_1px_0_rgba(201,169,110,0.2),0_4px_24px_-4px_rgba(26,18,8,0.08)] backdrop-blur-xl"
                : "bg-background/5 shadow-[0_1px_0_rgba(201,169,110,0)]",
            )}
          >
            <Logo />

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="hidden! lg:flex!">
                  <MegaMenuTrigger />
                </div>
                <Navigation />
              </div>

              <HeaderAction />
            </div>
          </div>
        </header>

        <div className="lg:hidden">
          <MegaMenuPanel />
        </div>

        <BottomNav />
      </MegaMenuProvider>
    </>
  );
};

export default Header;