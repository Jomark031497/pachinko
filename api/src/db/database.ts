import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { logger } from "../utils/logger.js";
import * as usersSchema from "../features/users/users.schema.js";

const sql = postgres(<string>process.env.DATABASE_URL, {
  max: 10,
  idle_timeout: 300,
});

export const db = drizzle(sql, {
  schema: {
    ...usersSchema,
  },
});

export const closeDbConnection = async () => {
  try {
    await sql.end();
    logger.info("Database connection closed.");
  } catch (error) {
    logger.error("Error closing database connection:", error);
  }
};
