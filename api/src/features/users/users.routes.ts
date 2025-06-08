import { Router } from "express";
import { requireAuth } from "../../middleswares/require-auth.js";
import { updateUserHandler } from "./users.controller.js";

const router = Router();

router.patch("/:id", requireAuth, updateUserHandler);

export default router;
