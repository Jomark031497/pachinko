import { createId } from "@paralleldrive/cuid2";
import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "../users/users.schema.js";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { transactions } from "../transactions/transactions.schema.js";

export const categoryTypeEnum = pgEnum("category_type", ["income", "expense"]); //Changed name to type

export const categories = pgTable("categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId())
    .notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  type: categoryTypeEnum().notNull(),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }).defaultNow().notNull(),
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  user: one(users, {
    fields: [categories.userId],
    references: [users.id],
  }),
  transactions: many(transactions),
}));

export const insertCategoriesSchema = createInsertSchema(categories);
export const selectCategoriesSchema = createSelectSchema(categories);
export const updateCategoriesSchema = insertCategoriesSchema.omit({ id: true, userId: true }).partial().strict();

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type UpdateCategory = typeof updateCategoriesSchema._type;
