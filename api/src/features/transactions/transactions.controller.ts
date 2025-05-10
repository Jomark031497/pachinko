import { NextFunction, Request, Response } from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactionsByUserId,
  getTransactionById,
  updateTransaction,
} from "./transactions.service.js";

export const createTransactionHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createTransaction(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getAllTransactionsByUserIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAllTransactionsByUserId(<string>req.params.userId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getTransactionByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getTransactionById(<string>req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateTransactionHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateTransaction(<string>req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteTransactionHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await deleteTransaction(<string>req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
