import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    /**
     * Role of the user in the app — narrow union instead of `any`.
     * Add values as needed (e.g. "admin").
     */
    role?: "admin" | "customer" | "seller" | "guest" | "unauthenticated" | string;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id?: string;
      role?: "admin" | "customer" | "seller" | "guest" | "unauthenticated" | string;
    };
  }
}
