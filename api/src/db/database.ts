import { drizzle } from "drizzle-orm/node-postgres";
import { envs } from "../config/envs.js";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: envs.DATABASE_URL,
});

export const db = drizzle({
  client: pool,
});
