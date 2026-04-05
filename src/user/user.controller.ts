import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import asyncHandler from "../helper/asyncHandler";

export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  },
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.loginService(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  },
);
