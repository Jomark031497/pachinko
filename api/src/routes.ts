import { Express } from "express";
import authRoutes from "./features/auth/auth.routes.js";
import accountsRoutes from "./features/accounts/accounts.routes.js";
import transactionsRoutes from "./features/transactions/transactions.routes.js";
import categoriesRoutes from "./features/categories/categories.routes.js";

export const initializeRoutes = (app: Express) => {
  app.use("/api/healthcheck", (_req, res) => {
    res.status(200).send("OK");
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/accounts", accountsRoutes);
  app.use("/api/transactions", transactionsRoutes);
  app.use("/api/categories", categoriesRoutes);
};
