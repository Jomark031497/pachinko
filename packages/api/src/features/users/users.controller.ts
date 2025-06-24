import type { Request, Response, NextFunction } from "express";
import { updateUser } from "./users.service.js";

export const updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateUser(<string>req.params.id, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
