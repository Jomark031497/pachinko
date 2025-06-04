import { z } from "zod";

export const ACCOUNT_TYPE = ["checking", "savings", "credit", "cash"] as const;

export interface Account {
  id: string;
  name: string;
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
  balance: z
    .string({
      required_error: "Balance is required",
    })
    .trim() // Removes leading/trailing whitespace
    .refine((val) => {
      // Regex: Optional negative sign, digits, then optional decimal with 1 or 2 digits.
      // Or just a single '0'
      const regex = /^-?\d+(\.\d{1,2})?$|^0$/;
      return regex.test(val);
    }, "Please enter a valid number with up to 2 decimal places.")
    .transform((val, ctx) => {
      const num = parseFloat(val);

      if (isNaN(num)) {
        // This should ideally be caught by the refine, but good as a fallback
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

      // Convert to string with exactly 2 decimal places (e.g., "10" becomes "10.00")
      return num.toFixed(2);
    }),
});

export const updateAccountSchema = createAccountSchema.partial();

export type CreateAccountInput = z.infer<typeof createAccountSchema>;

export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
