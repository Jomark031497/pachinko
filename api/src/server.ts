import { createApp } from "./app.js";
import { logger } from "./utils/logger.js";

const main = async () => {
  const app = createApp();
  const port = process.env.PORT;

  app.listen(port, () => {
    logger.info(`Server started at http://localhost:${port}`);
  });
};

main().catch((err) => {
  logger.error(err);
});
