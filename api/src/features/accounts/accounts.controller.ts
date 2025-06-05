import { Request, Response, NextFunction } from "express";
import {
  createAccount,
  deleteAccount,
  getAccountById,
  getAllAccountsByUserId,
  getSummaryForAccount,
  getSummaryForUser,
  updateAccount,
} from "./accounts.service.js";
import { Period } from "../../utils/periodRange.js";

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

export const getSummaryForUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getSummaryForUser(<string>req.params.userId, req.query.period as Period);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getSummaryForAccountHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getSummaryForAccount(<string>req.params.id, req.query.period as Period);
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
