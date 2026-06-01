// components/layout/header/AuthButton.tsx

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Dropdown from "./customDropdown";

import {
  authenticatedMenuItems,
  sellerMenuItems,
  guestMenuItems,
  unauthenticatedMenuItems,
} from "@/data/nav_data";

interface AlignProp {
  anchor?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

type UserMode =
  | "authenticated"
  | "seller"
  | "guest"
  | "unauthenticated";

const AuthButton = ({
  anchor,
}: AlignProp) => {
  const { data: session, status } =
    useSession();

  const [guestName, setGuestName] =
    useState<string | null>(null);

  useEffect(() => {
    const storedGuest =
      localStorage.getItem(
        "guest-user"
      );

    if (!storedGuest) return;

    try {
      const guest =
        JSON.parse(storedGuest);

      setGuestName(
        guest.fullName ??
          "Guest Shopper"
      );
    } catch {
      setGuestName(
        "Guest Shopper"
      );
    }
  }, []);

  const isAuthenticated =
    status === "authenticated";

  const isSeller =
    session?.user?.role ===
    "seller";

  const isGuest =
    !isAuthenticated &&
    !!guestName;

  let mode: UserMode =
    "unauthenticated";

  if (isAuthenticated) {
    mode = isSeller
      ? "seller"
      : "authenticated";
  } else if (isGuest) {
    mode = "guest";
  }

  const menu =
    mode === "seller"
      ? sellerMenuItems.items
      : mode === "guest"
      ? guestMenuItems.items
      : mode === "authenticated"
      ? authenticatedMenuItems.items
      : unauthenticatedMenuItems.items;

  const userName =
    mode === "guest"
      ? `${guestName} (Incognito)`
      : session?.user?.name ??
        "Guest";

  const avatarSrc =
    mode === "guest"
      ? undefined
      : session?.user?.image ??
        undefined;

  return (
    <Dropdown
      variant="auth"
      anchor={anchor}
      userName={userName}
      avatarSrc={avatarSrc}
      items={menu}
    />
  );
};

export default AuthButton;