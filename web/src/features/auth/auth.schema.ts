import { z } from "zod";

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "username must be atleast 3 characters long")
    .max(256, "username must not exceed 256 characters"),
  password: z
    .string()
    .min(6, "password must be atleast 6 characters long")
    .max(256, "password must not exceed 256 characters"),
});

export type LoginInputs = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  email: z
    .string()
    .email("please enter a valid email address")
    .min(3, "username must be atleast 3 characters long")
    .max(256, "username must not exceed 256 characters"),
  username: z
    .string()
    .min(3, "username must be atleast 3 characters long")
    .max(256, "username must not exceed 256 characters"),
  password: z
    .string()
    .min(6, "password must be atleast 6 characters long")
    .max(256, "password must not exceed 256 characters"),
  fullName: z.string().max(256, "full name must not exceed 256 characters").optional(),
});

export type SignUpInputs = z.infer<typeof signUpSchema>;
