import { z } from "zod";

export const CURRENCY = ["PHP", "USD", "EUR", "JPY", "AUD"] as const;

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  currency: "PHP" | "USD" | "EUR" | "JPY" | "AUD";
  createdAt: Date;
  updatedAt: Date;
}

export const createUserSchema = z.object({
  fullName: z.string(),
  currency: z.enum(CURRENCY),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
