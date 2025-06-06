import { z } from "zod";
import type { Account } from "~/features/accounts/accounts.schema";
import type { Category } from "~/features/categories/categories.schema";

// Define the possible transaction types, mirroring your pgEnum
export const TRANSACTION_TYPES = ["income", "expense", "transfer"] as const;

export const createTransactionSchema = z.object({
  userId: z.string(),
  accountId: z.string(),
  categoryId: z.string(),
  transferAccountId: z.string().optional(),
  type: z.enum(TRANSACTION_TYPES),
  transaction_date: z.date(),
  description: z.string().optional(),
  name: z.string(),
  amount: z
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

export const updateTransactionSchema = createTransactionSchema.partial();

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;

export type Transaction = {
  id: string;
  userId: string;
  accountId: string;
  categoryId: string;
  transferAccountId: string;
  name: string;
  type: "income" | "expense" | "transfer";
  amount: string;
  transaction_date: Date;
  description?: string;
};

export type TransactionWithCategory = Transaction & {
  category: Category;
};

export type TransactionWithCategoryAndAccount = TransactionWithCategory & {
  account: Account;
};
