import { createId } from "@paralleldrive/cuid2";
import { decimal, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "../users/users.schema.js";
import { accounts } from "../accounts/accounts.schema.js";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { categories } from "../categories/categories.schema.js";

export const transactionTypeEnum = pgEnum("transaction_type", ["income", "expense", "transfer"]);

export const transactions = pgTable("transactions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  accountId: text("account_id")
    .notNull()
    .references(() => accounts.id),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id),
  name: varchar("name", { length: 255 }).notNull(),
  type: transactionTypeEnum().notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  transaction_date: timestamp("transaction_date", { mode: "string", withTimezone: true }).notNull().defaultNow(),
  description: text("description"),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }).notNull().defaultNow(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  account: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id],
  }),
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

// Zod Schemas
export const insertTransactionSchema = createInsertSchema(transactions);
export const selectTransactionSchema = createSelectSchema(transactions);

export const updateTransactionSchema = insertTransactionSchema.omit({ id: true, userId: true }).partial().strict();

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
export type UpdateTransaction = typeof updateTransactionSchema._type;
