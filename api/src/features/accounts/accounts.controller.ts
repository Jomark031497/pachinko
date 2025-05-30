import { Request, Response, NextFunction } from "express";
import {
  createAccount,
  deleteAccount,
  getAccountById,
  getAllAccountsByUserId,
  updateAccount,
} from "./accounts.service.js";

export const getAllAccountsByUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAllAccountsByUserId(<string>req.params.userId, req.query);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getAccountByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAccountById(<string>req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const createAccountHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createAccount(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateAccountHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateAccount(<string>req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteAccountHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await deleteAccount(<string>req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
