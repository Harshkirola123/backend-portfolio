import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import asyncHandler from "../helper/asyncHandler";
import User from "./user.model";
import {
  removeAccessTokenCookie,
  removeRefreshTokenCookie,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../util/setCookies";
import { AuthRequest } from "../@types/express";

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
    setAccessTokenCookie(res, result.accessToken);

    res.status(201).json({
      success: true,
      data: { user: result.user },
    });
  },
);

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const result = await userService.refreshTokenService(refreshToken);

    setRefreshTokenCookie(res, result.newRefreshToken);
    setAccessTokenCookie(res, result.accessToken);

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: {},
    });
  },
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  removeRefreshTokenCookie(res);
  removeAccessTokenCookie(res);

  res.status(200).json({
    success: true,
    message: "Logout Successfull",
    data: {},
  });
});

export const getUserDetail = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = req.user;
    const data = await userService.getUserDetail(user?.id || "");

    res.status(200).json({
      success: true,
      message: "Logout Successfull",
      data: data,
    });
  },
);
