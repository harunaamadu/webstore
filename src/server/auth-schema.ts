import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  accountType: z.enum(["customer", "seller"]),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),

    username: z.string().min(3, "Username must be at least 3 characters"),

    email: z.email("Invalid email address"),

    accountType: z.enum(["customer", "seller"]),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^A-Za-z0-9]/, "Must contain a special character"),

    confirmPassword: z.string(),

    terms: z.boolean(),

    storeName: z.string().optional(),

    storeSlug: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;
