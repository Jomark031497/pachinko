import { Request, Response, NextFunction } from "express";
import { getAuthenticatedUser, loginUser, signUpUser } from "./auth.service.js";
import { __COOKIE_NAME__ } from "../../constants.js";

export const loginUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await loginUser(req.body);
    req.session.userId = data.id;
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const signupUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await signUpUser(req.body);
    req.session.userId = data.id;
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getAuthenticatedUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAuthenticatedUser(req.session.userId!);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const logoutUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "logout failed", error: err });
        return;
      }

      res.clearCookie(__COOKIE_NAME__);
      res.status(200).json({ message: "logged out successfully" });
    });
  } catch (error) {
    next(error);
  }
};
