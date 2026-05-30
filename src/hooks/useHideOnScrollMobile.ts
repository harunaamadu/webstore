// hooks/useHideOnScroll.ts

"use client";

import { useEffect, type RefObject } from "react";

import gsap from "gsap";

const useHideOnScrollMobile = (
  ref: RefObject<HTMLElement | null>,
  threshold = 80
) => {
  useEffect(() => {
    if (!ref.current) return;

    let lastY = window.scrollY;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const currentY =
          window.scrollY;

        // Hide when scrolling down
        if (
          currentY > threshold &&
          currentY > lastY
        ) {
          gsap.to(ref.current, {
            yPercent: 100,
            duration: 0.35,
            ease: "power2.out",
          });
        }

        // Show when scrolling up
        else {
          gsap.to(ref.current, {
            yPercent: 0,
            duration: 0.35,
            ease: "power2.out",
          });
        }

        lastY = currentY;

        ticking = false;
      });
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [ref, threshold]);
};

export default useHideOnScrollMobile;