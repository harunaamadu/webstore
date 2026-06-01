"use server";

import { signInSchema, registerSchema } from "./auth-schema";

export type SignInState = {
  success: boolean;
  error?: string;
};

export async function signInAction(
  _: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const values = signInSchema.parse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  return {
    success: true,
  };
}

export type RegisterState = {
  success: boolean;
  error?: string;
};

export async function registerAction(
  _: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  try {
    registerSchema.parse({
      fullName: formData.get("fullName"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword:
        formData.get("confirmPassword"),
      terms:
        formData.get("terms") === "on",
    });

    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Registration failed",
    };
  }
}
