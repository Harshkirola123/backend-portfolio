import { Response, NextFunction } from "express";
import * as profileService from "./profile.service";
import asyncHandler from "../helper/asyncHandler";
import { AuthRequest } from "../@types/express";

export const upsertProfile = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const result = await profileService.upsertProfile(req.body);

    res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      data: result,
    });
  },
);

export const getProfile = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const result = await profileService.getProfile();

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);
