import { z } from "zod";
import type { Account } from "~/features/accounts/accounts.schema";
import type { Category } from "~/features/categories/categories.schema";

// Define the possible transaction types, mirroring your pgEnum
export const TRANSACTION_TYPES = ["income", "expense", "transfer"] as const;

export const createTransactionSchema = z.object({
  accountId: z.string({ required_error: "Account is required." }).min(1, "Please select an account."),

  categoryId: z.string({ required_error: "Category is required." }).min(1, "Please select a category."),
  // If 'transfer' transactions should not have a category, you'll need conditional validation (see notes below)

  name: z
    .string({ required_error: "Transaction name is required." })
    .min(1, "Transaction name cannot be empty.")
    .max(255, "Transaction name cannot exceed 255 characters."),

  type: z.enum(TRANSACTION_TYPES, {
    required_error: "Transaction type is required.",
    errorMap: (issue, ctx) => {
      if (issue.code === "invalid_enum_value") {
        return { message: "Invalid transaction type selected." };
      }
      return { message: ctx.defaultError };
    },
  }),

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

      return num.toFixed(2);
    }),

  description: z
    .string()
    .max(1000, "Description cannot exceed 1000 characters.") // Optional: Add a max length if desired
    .optional(), // Corresponds to nullable text("description")
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

export type Transaction = {
  id: string;
  userId: string;
  accountId: string;
  categoryId: string;
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
