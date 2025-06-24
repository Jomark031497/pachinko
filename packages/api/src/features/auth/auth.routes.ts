import { Router } from "express";
import { validateSchema } from "../../middleswares/validate-schema.js";
import { insertUserSchema, selectUserSchema } from "../users/users.schema.js";
import {
  getAuthenticatedUserHandler,
  loginUserHandler,
  logoutUserHandler,
  signupUserHandler,
} from "./auth.controller.js";
import { requireAuth } from "../../middleswares/require-auth.js";

const router = Router();

router.get("/user", requireAuth, getAuthenticatedUserHandler);

router.post("/sign-up", validateSchema(insertUserSchema), signupUserHandler);
router.post(
  "/login",
  validateSchema(
    selectUserSchema.pick({
      username: true,
      password: true,
    })
  ),
  loginUserHandler
);

router.delete("/logout", requireAuth, logoutUserHandler);

export default router;
