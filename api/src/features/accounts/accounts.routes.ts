import { Router } from "express";
import { requireAuth } from "../../middleswares/require-auth.js";
import { validateSchema } from "../../middleswares/validate-schema.js";
import { insertAccountsSchema, updateAccountsSchema } from "./accounts.schema.js";
import {
  createAccountHandler,
  deleteAccountHandler,
  getAccountByIdHandler,
  getAllAccountsByUserHandler,
  updateAccountHandler,
} from "./accounts.controller.js";

const router = Router();

router.get("/:id", requireAuth, getAccountByIdHandler);

router.get("/user/:userId", requireAuth, getAllAccountsByUserHandler);

router.post("/", requireAuth, validateSchema(insertAccountsSchema), createAccountHandler);

router.patch("/:id", requireAuth, validateSchema(updateAccountsSchema), updateAccountHandler);

router.delete("/:id", requireAuth, deleteAccountHandler);

export default router;
