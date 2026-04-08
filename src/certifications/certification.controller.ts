import { Request, Response, NextFunction } from "express";
import asyncHandler from "../helper/asyncHandler";
import * as certificationService from "./certification.service";
import { AuthRequest } from "../@types/express";

export const addCertification = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const result = await certificationService.addCertificationService(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  },
);

export const getAllCertifications = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await certificationService.getAllCertifications(req.query);

    res.status(200).json({
      success: true,
      ...result,
    });
  },
);

export const getCertificationById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    const result = await certificationService.getCertificationById(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

export const updateCertification = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    const result = await certificationService.updateCertification(id, req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

export const deleteCertification = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    const result = await certificationService.deleteCertification(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

export const toggleCertificationStatus = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    const result = await certificationService.toggleCertificationStatus(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);
