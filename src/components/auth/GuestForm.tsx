"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function GuestForm() {
  const [fullName, setFullName] = useState("");

  const [age, setAge] = useState("");

  const handleGuestLogin = () => {
    if (!fullName.trim()) {
      toast.error("Please enter your full name");

      return;
    }

    toast.success("Incognito shopping mode activated");

    // create temporary guest session
    localStorage.setItem(
      "guest-user",
      JSON.stringify({
        fullName,
        age,
        createdAt: Date.now(),
      }),
    );
  };

  return (
    <div className="w-full max-w-md border bg-background/80 p-6 backdrop-blur-lg md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Shop as Guest</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          You're entering
          <span className="font-medium"> Incognito Shopping Mode</span>.
        </p>
      </div>

      <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
        <h3 className="mb-2 font-medium">Temporary Account Notice</h3>

        <p className="text-sm text-muted-foreground">
          Your account, cart, order history, and preferences will exist
          temporarily for this session only.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          To permanently save your shopping activity, create a customer account.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <Input
          type="number"
          min="1"
          max="120"
          placeholder="Age (Optional)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <div className="rounded-lg border p-4 text-sm">
          <ul className="space-y-2">
            <li>✓ Quick checkout</li>
            <li>✓ No password required</li>
            <li>✓ No registration needed</li>
            <li>✗ Temporary shopping history</li>
            <li>✗ No saved wishlist</li>
            <li>✗ No seller access</li>
          </ul>
        </div>

        <Button onClick={handleGuestLogin} className="w-full">
          Start Incognito Shopping
        </Button>
      </div>
    </div>
  );
}
