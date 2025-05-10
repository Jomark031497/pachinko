import { Router } from "express";
import { requireAuth } from "../../middleswares/require-auth.js";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getAllCategoriesByUserIdHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
} from "./categories.controller.js";
import { validateSchema } from "../../middleswares/validate-schema.js";
import { insertCategoriesSchema, updateCategoriesSchema } from "./categories.schema.js";

const router = Router();

router.get("/user/:userId", requireAuth, getAllCategoriesByUserIdHandler);
router.get("/:id", requireAuth, getCategoryByIdHandler);

router.post("/", requireAuth, validateSchema(insertCategoriesSchema), createCategoryHandler);

router.patch("/:id", requireAuth, validateSchema(updateCategoriesSchema), updateCategoryHandler);

router.delete("/:id", requireAuth, deleteCategoryHandler);

export default router;
