import { Express } from "express";
import authRoutes from "./features/auth/auth.routes.js";

export const initializeRoutes = (app: Express) => {
  app.use("/api/healthcheck", (_req, res) => {
    res.status(200).send("OK");
  });

  app.use("/api/auth", authRoutes);
};
