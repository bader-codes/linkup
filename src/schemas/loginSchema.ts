import { z } from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .min(1, "Email or username is required")
    .refine(
      (value) => {
        const isEmail = z.string().email().safeParse(value).success;

        const isUsername = /^[a-zA-Z]{3}[a-zA-Z0-9_]{2,7}$/.test(value);

        return isEmail || isUsername;
      },
      "Please enter a valid email or username",
    ),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .refine(
      (value) => /[A-Z]/.test(value),
      "Password must contain at least 1 uppercase letter",
    )
    .refine(
      (value) => /[a-z]/.test(value),
      "Password must contain at least 1 lowercase letter",
    )
    .refine(
      (value) => (value.match(/\d/g) || []).length >= 4,
      "Password must contain at least 4 numbers",
    )
    .refine(
      (value) => /[#?!@$%^&*-]/.test(value),
      "Password must contain at least 1 special character",
    ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;