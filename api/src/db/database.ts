import { drizzle } from "drizzle-orm/node-postgres";
import { envs } from "../config/envs.js";
import { Pool } from "pg";
import * as users from "../features/users/users.schema.js";
import * as transactions from "../features/transactions/transactions.schema.js";
import * as categories from "../features/categories/categories.schema.js";
import * as accounts from "../features/accounts/accounts.schema.js";

export const pool = new Pool({
  connectionString: envs.DATABASE_URL,
});

export const db = drizzle({
  client: pool,
  schema: {
    ...users,
    ...transactions,
    ...categories,
    ...accounts,
  },
});
