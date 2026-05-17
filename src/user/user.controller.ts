import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import asyncHandler from "../helper/asyncHandler";
import {
  removeRefreshTokenCookie,
  setRefreshTokenCookie,
} from "../util/setCookies";

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
    const result = await userService.loginService(req.body);

    setRefreshTokenCookie(res, result.refreshToken);

    res.status(201).json({
      success: true,
      data: { user: result.user, accessToken: result.accessToken },
    });
  },
);

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const result = await userService.refreshTokenService(refreshToken);

    setRefreshTokenCookie(res, result.newRefreshToken);

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: { accessToken: result.accessToken },
    });
  },
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  removeRefreshTokenCookie(res);

  res.status(200).json({
    success: true,
    message: "Logout Successfull",
    data: {},
  });
});
