import { NextFunction, Request, Response } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategoriesByUserId,
  getCategoryById,
  updateCategory,
} from "./categories.service.js";

export const getAllCategoriesByUserIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAllCategoriesByUserId(<string>req.params.userId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getCategoryByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getCategoryById(<string>req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const createCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createCategory(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateCategory(<string>req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await deleteCategory(<string>req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
