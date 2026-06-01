"use client";

import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({
  password,
}: PasswordStrengthProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  const score = useMemo(() => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  }, [password]);

  const width = `${score * 20}%`;

  useEffect(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      width,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [width]);

  const status = useMemo(() => {
    if (score <= 2)
      return {
        label: "Weak",
        color: "bg-red-500",
      };

    if (score <= 4)
      return {
        label: "Medium",
        color: "bg-yellow-500",
      };

    return {
      label: "Strong",
      color: "bg-green-500",
    };
  }, [score]);

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          ref={progressRef}
          className={cn(
            "h-full w-0 rounded-full",
            status.color
          )}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Password strength:{" "}
        <span className="font-medium">
          {status.label}
        </span>
      </p>
    </div>
  );
}