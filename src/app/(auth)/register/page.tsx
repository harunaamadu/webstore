"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/components/common/logo";

const RegisterPage = () => {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blobRef.current) return;

    const xTo = gsap.quickTo(blobRef.current, "x", {
      duration: 1.2,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(blobRef.current, "y", {
      duration: 1.2,
      ease: "power3.out",
    });

    const rotateTo = gsap.quickTo(blobRef.current, "rotation", {
      duration: 2,
      ease: "power2.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      rotateTo(gsap.utils.mapRange(0, window.innerWidth, -20, 20, e.clientX));
    };

    window.addEventListener("mousemove", handleMouseMove);

    gsap.to(blobRef.current, {
      borderRadius: "58% 42% 63% 37% / 43% 58% 42% 57%",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-360 h-screen mx-auto p-4 px-6 md:px-8 bg-primary/5 backdrop-blur-lg">
        <div className="w-full h-full grid md:grid-cols-2 gap-4">
          <div className="w-full"><Logo /></div>
          <div className="w-full flex flex-col items-center justify-center h-full">
            <RegisterForm />
          </div>
        </div>
      </div>

      {/* Follow cursor blob */}
      <div
        ref={blobRef}
        className={cn(
          "fixed top-0 left-0 w-[15vw] aspect-square",
          "-translate-x-1/2 -translate-y-1/2",
          "bg-radial from-primary/25 via-transparent to-transparent blur-4xl",
          "pointer-events-none -z-10",
          "[clip-path:shape(from_85.23%_62.69%,curve_to_56.50%_83.99%_with_71.73%_76.26%,curve_to_25.11%_81.20%_with_41.26%_91.71%,curve_to_16.63%_54.44%_with_8.95%_70.68%,curve_to_32.91%_26.93%_with_24.31%_38.19%,curve_to_58.61%_16.10%_with_41.51%_15.66%,curve_to_87.22%_32.83%_with_75.71%_16.54%,curve_to_85.23%_62.69%_with_98.74%_49.13%)]",
        )}
      />
    </div>
  );
};

export default RegisterPage;
