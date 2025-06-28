import { Router } from "express";
import { requireAuth } from "../../middleswares/require-auth.js";
import { validateSchema } from "../../middleswares/validate-schema.js";
import { insertAccountsSchema, updateAccountsSchema } from "./accounts.schema.js";
import {
  createAccountHandler,
  deleteAccountHandler,
  getAccountByIdHandler,
  getAllAccountsByUserHandler,
  getSummaryForAccountHandler,
  getSummaryForUserHandler,
  updateAccountHandler,
} from "./accounts.controller.js";

const router = Router();

router.get("/:id", requireAuth, getAccountByIdHandler);

router.get("/users/:userId", requireAuth, getAllAccountsByUserHandler);

router.get("/summary/users/:userId", requireAuth, getSummaryForUserHandler);
router.get("/summary/accounts/:id", requireAuth, getSummaryForAccountHandler);

router.post("/", requireAuth, validateSchema(insertAccountsSchema), createAccountHandler);

router.patch("/:id", requireAuth, validateSchema(updateAccountsSchema), updateAccountHandler);

router.delete("/:id", requireAuth, deleteAccountHandler);

export default router;
