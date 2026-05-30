import React from "react";
import { cn } from "@/lib/utils";

interface DiscountBadgeProps {
  percent: number;
  className?: string;
}

const DiscountBadge = ({ percent, className }: DiscountBadgeProps) => (
  <div
    className={cn("relative inline-flex items-center", className)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 9.5 82 42"
      className="h-7 w-auto drop-shadow-sm"
    >
      <path
        d="M 30 11 L 70 11 Q 80 11 80 21 L 80 40 Q 80 50 70 50 L 30 50 C 17 50 10 41 5 35 S 0 29 5 24 S 17 11 30 11 m -15 12 a 1 1 0 0 0 0 13 a 1 1 0 0 0 0 -13 z"
        fill="#dc2626"
      />

      <text
        x="48"
        y="31"
        fill="white"
        fontSize="16"
        fontWeight="700"
        textAnchor="middle"
        dominantBaseline="middle"
        className="tracking-wide leading-none font-black pointer-events-none"
      >
        -{percent}%
      </text>
    </svg>
  </div>
);

export default DiscountBadge;
