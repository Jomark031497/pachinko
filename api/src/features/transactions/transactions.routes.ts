import { Router } from "express";
import { requireAuth } from "../../middleswares/require-auth.js";
import {
  createTransactionHandler,
  deleteTransactionHandler,
  getAllTransactionsByUserIdHandler,
  getTransactionByIdHandler,
  updateTransactionHandler,
} from "./transactions.controller.js";
import { validateSchema } from "../../middleswares/validate-schema.js";
import { insertTransactionSchema, updateTransactionSchema } from "./transactions.schema.js";

const router = Router();

router.get("/user/:userId", requireAuth, getAllTransactionsByUserIdHandler);

router.get("/:id", requireAuth, getTransactionByIdHandler);

router.post("/", requireAuth, validateSchema(insertTransactionSchema), createTransactionHandler);

router.patch("/:id", requireAuth, validateSchema(updateTransactionSchema), updateTransactionHandler);

router.delete("/:id", requireAuth, deleteTransactionHandler);

export default router;
