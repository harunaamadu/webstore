"use client";

import { Button } from "@/components/ui/button";
import {
  GoogleLogoIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react";

export default function SocialLogin() {
  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full"
      >
        <GoogleLogoIcon size={18} />
        Continue with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full"
      >
        <GithubLogoIcon size={18} />
        Continue with GitHub
      </Button>
    </div>
  );
}