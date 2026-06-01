"use client";

import { cn } from "@/lib/utils";

interface AccountTypeSwitchProps {
  value: "customer" | "seller";
  onChange: (
    value: "customer" | "seller"
  ) => void;
}

export default function AccountTypeSwitch({
  value,
  onChange,
}: AccountTypeSwitchProps) {
  return (
    <div className="mb-6 grid grid-cols-2 rounded-lg border p-1">
      <button
        type="button"
        onClick={() =>
          onChange("customer")
        }
        className={cn(
          "rounded-md py-2 text-sm font-medium transition",
          value === "customer" &&
            "bg-primary text-primary-foreground"
        )}
      >
        Customer
      </button>

      <button
        type="button"
        onClick={() =>
          onChange("seller")
        }
        className={cn(
          "rounded-md py-2 text-sm font-medium transition",
          value === "seller" &&
            "bg-primary text-primary-foreground"
        )}
      >
        Seller
      </button>
    </div>
  );
}