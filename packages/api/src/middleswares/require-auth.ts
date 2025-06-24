import { NextFunction, Request, Response } from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    next(); // user is logged in
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
