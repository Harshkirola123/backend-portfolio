import { Response, NextFunction } from "express";
import * as experienceService from "./experience.service";
import asyncHandler from "../helper/asyncHandler";
import { AuthRequest } from "../@types/express";

export const addExperience = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const result = await experienceService.createExperience(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  },
);

export const getAllExperiences = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const result = await experienceService.getAllExperiences(req.query);

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

export const getSingleExperience = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    const result = await experienceService.getSingleExperience(id);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Experience not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

export const updateExperience = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    const result = await experienceService.updateExperience(id, req.body);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Experience not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

export const deleteExperience = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    const result = await experienceService.deleteExperience(id);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Experience not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  },
);
