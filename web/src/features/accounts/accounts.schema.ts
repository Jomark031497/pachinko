import { z } from "zod";

export const ACCOUNT_TYPE = ["checking", "savings", "credit", "cash"] as const;

export type Period = "this-week" | "this-month" | "this-year";

export interface Account {
  id: string;
  name: string;
  icon?: string;
  type: "checking" | "savings" | "credit" | "cash";
  balance: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createAccountSchema = z.object({
  name: z.string().min(1, "Account name is required").max(100, "Account name must not exceed 100 characters"),
  type: z.enum(ACCOUNT_TYPE),
  userId: z.string(),
  icon: z
    .string()
    .emoji()
    .refine((val) => [...val].length === 1, {
      message: "Only one emoji is allowed",
    })
    .optional(),
  balance: z
    .string({
      required_error: "Balance is required",
    })
    .trim()
    .refine((val) => {
      const regex = /^-?\d+(\.\d{1,2})?$|^0$/;
      return regex.test(val);
    }, "Please enter a valid number with up to 2 decimal places.")
    .transform((val, ctx) => {
      const num = parseFloat(val);

      if (isNaN(num)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Balance must be a valid number.",
        });
        return z.NEVER;
      }
      if (num < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Balance cannot be negative.",
        });
        return z.NEVER;
      }
      return num.toFixed(2);
    }),
});

export const updateAccountSchema = createAccountSchema.partial();

export type CreateAccountInput = z.infer<typeof createAccountSchema>;

export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
