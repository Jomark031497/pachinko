import express from "express";
import authRoutes from "./features/auth/auth.routes.js";
import { errorHandler } from "./middleswares/error-handler.js";
import session from "express-session";
import cors from "cors";
import { __COOKIE_NAME__, __IS_PROD__ } from "./constants.js";
import connectPgSimple from "connect-pg-simple";
import { envs } from "./config/envs.js";
import { pool } from "./db/database.js";
import { initializeRoutes } from "./routes.js";

export const createApp = () => {
  const app = express();

  const PgSession = connectPgSimple(session);

  app.use(
    cors({
      origin: envs.CLIENT_URL,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      store: new PgSession({
        pool: pool,
        tableName: "session", // Default table name
        createTableIfMissing: true, // Optional: auto-create the table
      }),
      secret: envs.SECRET_KEY,
      name: __COOKIE_NAME__,
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        maxAge: 3600000 * 24, // 1 day
        secure: __IS_PROD__, // HTTPS-only in production
      },
    })
  );

  initializeRoutes(app);

  app.use(errorHandler);

  return app;
};
