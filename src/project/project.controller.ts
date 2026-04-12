import { Response, NextFunction } from "express";
import * as projectService from "./project.service";
import asyncHandler from "../helper/asyncHandler";
import { AuthRequest } from "../@types/express";

export const addProject = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const result = await projectService.addProject(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  },
);

export const updateProject = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    const result = await projectService.updateProject(id, req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

export const deleteProject = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    const result = await projectService.deleteProject(id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: result,
    });
  },
);

export const getProjectById = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    const result = await projectService.getProjectById(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

export const getAllProjects = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const result = await projectService.getAllProjects(req.query);

    res.status(200).json({
      success: true,
      ...result,
    });
  },
);
