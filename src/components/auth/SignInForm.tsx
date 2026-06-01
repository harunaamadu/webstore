"use client";

import React, { useActionState, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import SocialLogin from "./SocialLogin";
import AccountTypeSwitch from "./AccountTypeSwitch";

import { signInAction, type SignInState } from "@/server/actions";

import { signInSchema, type SignInValues } from "@/server/auth-schema";
import { Separator } from "../ui/separator";

const initialState: SignInState = {
  success: false,
};

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [state, action, pending] = useActionState(signInAction, initialState);

  const {
    register,
    formState: { errors, isValid },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema as any),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }

    if (state.success) {
      toast.success("Successfully signed in");
    }
  }, [state]);

  const [accountType, setAccountType] = useState<"customer" | "seller">(
    "customer",
  );

  return (
    <div className="w-full max-w-md border bg-background/80 p-6 backdrop-blur-lg md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome Back</h1>

        <p className="text-muted-foreground">Sign in to continue shopping.</p>
      </div>

      <AccountTypeSwitch value={accountType} onChange={setAccountType} />

      <input type="hidden" value={accountType} {...register("accountType")} />

      <form action={action} className="space-y-5">
        <div>
          <Input
            {...register("username")}
            placeholder="Username"
            autoComplete="username"
          />

          {errors.username && (
            <p className="mt-1 text-xs text-destructive">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              className="pr-12"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-0 top-0 h-full"
            >
              {showPassword ? (
                <EyeSlashIcon size={18} />
              ) : (
                <EyeIcon size={18} />
              )}
            </Button>
          </div>

          {errors.password && (
            <p className="mt-1 text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" disabled={pending || !isValid} className="w-full">
          {pending ? "Signing In..." : "Sign In"}
        </Button>

        <div className="relative py-2">
          <Divider className="absolute inset-0 flex items-center" />

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <SocialLogin />

        <div className="relative">
          <Separator />

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-primary">
              Register
            </Link>
          </p>
        </div>

        <div className="relative">
          <Separator />

          <p className="text-center text-sm mt-4">
            You can also continue as a guest{" "}
            <Link href="/guest-account" className="font-medium text-primary">
              Guest Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

function Divider({ className }: { className?: string } = {}) {
  return (
    <div className={`flex ${className || ""}`}>
      <span className="w-full border-t" />
    </div>
  );
}
