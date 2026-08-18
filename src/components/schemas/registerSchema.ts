import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(3, "First name must be at least 3 characters")
      .max(10, "First name must be at most 10 characters"),

    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(3, "Last name must be at least 3 characters")
      .max(10, "Last name must be at most 10 characters"),

    username: z
      .string()
      .min(1, "Username is required")
      .max(10, "Username must be at most 10 characters")
      .regex(
        /^[a-zA-Z]{3}[a-zA-Z0-9]*$/,
        "Username must start with at least 3 letters and contain only letters and numbers",
      ),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),

    dateOfBirth: z
      .object({
        day: z
          .string()
          .min(1, "Day is required")
          .regex(/^\d+$/, "Day must be a number")
          .refine((value) => Number(value) >= 1 && Number(value) <= 31, {
            message: "Day must be between 1 and 31",
          }),

        month: z
          .string()
          .min(1, "Month is required")
          .regex(/^\d+$/, "Month must be a number")
          .refine((value) => Number(value) >= 1 && Number(value) <= 12, {
            message: "Month must be between 1 and 12",
          }),

        year: z
          .string()
          .min(1, "Year is required")
          .regex(/^\d{4}$/, "Year must be 4 digits"),
      })
      .refine(
        ({ day, month, year }) => {
          const date = new Date(Number(year), Number(month) - 1, Number(day));

          return (
            date.getFullYear() === Number(year) &&
            date.getMonth() === Number(month) - 1 &&
            date.getDate() === Number(day)
          );
        },
        {
          message: "Please enter a valid date",
        },
      )
      .refine(
        ({ day, month, year }) => {
          const birthDate = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
          );

          const today = new Date();

          let age = today.getFullYear() - birthDate.getFullYear();

          const hasBirthdayPassed =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() &&
              today.getDate() >= birthDate.getDate());

          if (!hasBirthdayPassed) {
            age--;
          }

          return age >= 13 && age <= 120;
        },
        {
          message: "You must be 15 years or older",
        },
      ),

    gender: z.string().min(1, "Gender is required"),

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

    rePassword: z.string().min(1, "Please confirm your password"),
  })

  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
