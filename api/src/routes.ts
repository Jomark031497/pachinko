import { Express } from "express";
import authRoutes from "./features/auth/auth.routes.js";
import accountRoutes from "./features/accounts/accounts.routes.js";

export const initializeRoutes = (app: Express) => {
  app.use("/api/healthcheck", (_req, res) => {
    res.status(200).send("OK");
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/accounts", accountRoutes);
};
