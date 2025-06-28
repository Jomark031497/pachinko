import { Router } from "express";
import { requireAuth } from "../../middleswares/require-auth.js";
import {
  createTransactionHandler,
  deleteTransactionHandler,
  getAllTransactionsByAccountIdHandler,
  getAllTransactionsByUserIdHandler,
  getTransactionByIdHandler,
  updateTransactionHandler,
} from "./transactions.controller.js";
import { validateSchema } from "../../middleswares/validate-schema.js";
import { insertTransactionSchema, updateTransactionSchema } from "./transactions.schema.js";

const router = Router();

router.get("/users/:userId", requireAuth, getAllTransactionsByUserIdHandler);

router.get("/accounts/:accountId", requireAuth, getAllTransactionsByAccountIdHandler);

router.get("/:id", requireAuth, getTransactionByIdHandler);

router.post("/", requireAuth, validateSchema(insertTransactionSchema), createTransactionHandler);

router.patch("/:id", requireAuth, validateSchema(updateTransactionSchema), updateTransactionHandler);

router.delete("/:id", requireAuth, deleteTransactionHandler);

export default router;
