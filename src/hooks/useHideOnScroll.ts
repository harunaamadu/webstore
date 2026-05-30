// hooks/useHideOnScroll.ts

"use client";

import { useEffect, type RefObject } from "react";

import gsap from "gsap";

const useHideOnScroll = (
  ref: RefObject<HTMLElement | null>,
  threshold = 80
) => {
  useEffect(() => {
    if (!ref.current) return;

    let lastY = 0;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY =
            window.scrollY;

          if (currentY > threshold) {
            if (currentY > lastY) {
              gsap.to(ref.current, {
                yPercent: -100,
                duration: 0.35,
                ease: "power2.inOut",
              });
            } else {
              gsap.to(ref.current, {
                yPercent: 0,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          } else {
            gsap.to(ref.current, {
              yPercent: 0,
              duration: 0.3,
            });
          }

          lastY = currentY;

          ticking = false;
        });

        ticking = true;
      }
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

export default useHideOnScroll;