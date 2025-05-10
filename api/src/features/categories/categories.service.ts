import { eq } from "drizzle-orm";
import { db } from "../../db/database.js";
import { categories, Category, NewCategory } from "./categories.schema.js";
import { AppError } from "../../utils/errors.js";

export const createCategory = async (payload: NewCategory) => {
  const [newCategory] = await db.insert(categories).values(payload).returning();
  return newCategory;
};

export const getAllCategoriesByUserId = async (userId: Category["userId"]) => {
  const allCategories = await db.select().from(categories).where(eq(categories.userId, userId));
  return allCategories;
};

export const getCategoryById = async (id: Category["id"]) => {
  const [category] = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return category;
};

export const updateCategory = async (id: Category["id"], payload: NewCategory) => {
  const category = await getCategoryById(id);
  if (!category) throw new AppError(404, "category id not found");

  const [updatedCategory] = await db.update(categories).set(payload).where(eq(categories.id, id)).returning();

  return updatedCategory;
};

export const deleteCategory = async (id: Category["id"]) => {
  const category = await getCategoryById(id);
  if (!category) throw new AppError(404, "category id not found");

  await db.delete(categories).where(eq(categories.id, id));

  return { message: "category deleted successfully" };
};
