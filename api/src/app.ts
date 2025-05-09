import express from "express";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded());

  return app;
};
