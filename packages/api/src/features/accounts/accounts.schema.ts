import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { decimal, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "../users/users.schema.js";
import { transactions } from "../transactions/transactions.schema.js";

export const ACCOUNT_TYPES = ["checking", "savings", "credit", "cash"] as const;

export const accountTypeEnum = pgEnum("account_type", ACCOUNT_TYPES);

export const accounts = pgTable("accounts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  icon: text("icon"),
  type: accountTypeEnum().notNull(),
  balance: decimal("balance", { precision: 12, scale: 2 }).notNull().default("0"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }).notNull().defaultNow(),
});

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
  transactions: many(transactions),
}));

export const insertAccountsSchema = createInsertSchema(accounts, {});
export const selectAccountsSchema = createSelectSchema(accounts);
export const updateAccountsSchema = insertAccountsSchema.omit({ userId: true, id: true }).partial().strict();

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
export type UpdateAccount = typeof updateAccountsSchema._type;
