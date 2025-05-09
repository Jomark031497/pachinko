import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "../users/users.schema.js";
import { InferSelectModel } from "drizzle-orm";

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Session = InferSelectModel<typeof sessionTable>;
