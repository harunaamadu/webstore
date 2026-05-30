// components/layout/header/AuthButton.tsx

"use client";

import Dropdown from "./customDropdown";

import {
  authenticatedMenuItems,
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

import { useSession } from "next-auth/react";

const AuthButton = ({anchor}:AlignProp) => {
  const { data: session, status } =
    useSession();

  /**
   * Safe default:
   * show logged-out state until session loads
   */

  const isAuthenticated =
    status === "authenticated";

  const menu = isAuthenticated
    ? authenticatedMenuItems.items
    : unauthenticatedMenuItems.items;

  const userName =
    session?.user?.name ?? "Guest";

  const avatarSrc =
    session?.user?.image ?? undefined;

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