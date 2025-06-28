import express from "express";
import { errorHandler } from "./middleswares/error-handler.js";
import session from "express-session";
import cors from "cors";
import { __COOKIE_NAME__, __IS_PROD__ } from "./constants.js";
import { envs } from "./config/envs.js";
import { initializeRoutes } from "./routes.js";
import { Redis } from "ioredis";
import { RedisStore } from "connect-redis";

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: [envs.CLIENT_URL],
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const redisClient = new Redis();

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: "sess:",
  });

  app.use(
    session({
      store: redisStore,
      secret: envs.SECRET_KEY,
      name: __COOKIE_NAME__,
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        maxAge: 3600000 * 24,
        secure: __IS_PROD__,
        sameSite: "lax",
      },
    }),
  );

  initializeRoutes(app);

  app.use(errorHandler);

  return app;
};
