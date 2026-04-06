import { Request, Response, NextFunction } from "express";
import asyncHandler from "../helper/asyncHandler";
import * as educationService from "./education.service";
import { AuthRequest } from "../@types/express";

export const addEducation = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    const result = await educationService.addEducationService(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  },
);

export const getAllEducation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await educationService.getAllEducation(req.query);

    res.status(200).json({
      success: true,
      message: "Education fetched successfully",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const getEducationById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const education = await educationService.getEducationById(id);

    res.status(200).json({
      success: true,
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const updated = await educationService.updateEducation(id, req.body);

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEducation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const result = await educationService.deleteEducation(id);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
