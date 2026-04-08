import { Router } from "express";
import * as experienceController from "./experience.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", experienceController.getAllExperiences);
router.get("/:id", experienceController.getSingleExperience);

router.post("/add", authMiddleware, experienceController.addExperience);
router.patch("/:id", authMiddleware, experienceController.updateExperience);
router.delete("/:id", authMiddleware, experienceController.deleteExperience);

export default router;
