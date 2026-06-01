"use client";

import React, { useActionState, useEffect, useState } from "react";

import Link from "next/link";

import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { registerSchema, type RegisterValues } from "@/server/auth-schema";

import { registerAction, type RegisterState } from "@/server/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import PasswordStrength from "./PasswordStrength";
import SocialLogin from "./SocialLogin";
import AccountTypeSwitch from "./AccountTypeSwitch";
import { Separator } from "../ui/separator";

const initialState: RegisterState = {
  success: false,
};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [state, action, pending] = useActionState(registerAction, initialState);

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema as any),
    mode: "onChange",
  });

  const password = watch("password") ?? "";

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }

    if (state.success) {
      toast.success("Account created successfully");
    }
  }, [state]);

  const [accountType, setAccountType] = useState<"customer" | "seller">(
    "customer",
  );

  return (
    <div className="w-full max-w-md border bg-background/80 p-6 backdrop-blur-lg md:p-8">
      <div className="mb-8 leading-snug">
        <h1 className="text-3xl font-bold mb-2">
          Create {accountType === "seller" ? "Seller" : "Customer"} Account
        </h1>

        <p className="text-muted-foreground">
          {accountType === "seller"
            ? "Join Webstore today as a seller!"
            : "Join Webstore today!"}
        </p>
      </div>

      <form action={action} className="space-y-5">
        <AccountTypeSwitch value={accountType} onChange={setAccountType} />

        {accountType === "seller" && (
          <>
            <Input {...register("storeName")} placeholder="Store Name" />
            <Input {...register("storeSlug")} placeholder="Store Slug" />
          </>
        )}

        <input type="hidden" value={accountType} {...register("accountType")} />

        <Input {...register("fullName")} placeholder="Full Name" />

        {errors.fullName && (
          <p className="text-xs text-destructive">{errors.fullName.message}</p>
        )}

        <Input {...register("username")} placeholder="Username" />

        {errors.username && (
          <p className="text-xs text-destructive">{errors.username.message}</p>
        )}

        <Input
          {...register("email")}
          type="email"
          placeholder="Email Address"
        />

        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}

        <div>
          <div className="relative">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pr-12"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-0 top-0 h-full"
            >
              {showPassword ? (
                <EyeSlashIcon size={18} />
              ) : (
                <EyeIcon size={18} />
              )}
            </Button>
          </div>

          <div className="mt-3">
            <PasswordStrength password={password} />
          </div>

          {errors.password && (
            <p className="mt-2 text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="relative">
          <Input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="pr-12"
          />

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setShowConfirmPassword((v) => !v)}
            className="absolute right-0 top-0 h-full"
          >
            {showConfirmPassword ? (
              <EyeSlashIcon size={18} />
            ) : (
              <EyeIcon size={18} />
            )}
          </Button>
        </div>

        {errors.confirmPassword && (
          <p className="text-xs text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("terms")} />I agree to the Terms &
          Conditions
        </label>

        <Button type="submit" disabled={pending || !isValid} className="w-full">
          {pending ? "Creating Account..." : "Create Account"}
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>

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
            Already have an account?{" "}
            <Link href="/sign-in" className="font-medium text-primary">
              Sign In
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
