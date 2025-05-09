import express from "express";
import authRoutes from "./features/auth/auth.routes.js";
import { errorHandler } from "./middleswares/error-handler.js";
import session from "express-session";
import { __COOKIE_NAME__ } from "./constants.js";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded());

  app.use(
    session({
      secret: <string>process.env.SECRET_KEY,
      name: __COOKIE_NAME__,
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        maxAge: 3600000 * 24, // 1 day
        secure: process.env.NODE_ENV === "production", // HTTPS-only in production
      },
    })
  );

  app.use("/api/auth", authRoutes);

  app.use(errorHandler);

  return app;
};
