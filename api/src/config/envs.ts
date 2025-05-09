import { z } from "zod";
import { logger } from "../utils/logger.js";

const envSchema = z.object({
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
  CLIENT_URL: z.string().url(),
  SECRET_KEY: z.string(),
  COOKIE_NAME: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  logger.error("Invalid environment variables:", parsedEnv.error);
  process.exit(1);
}

export const envs = parsedEnv.data;
