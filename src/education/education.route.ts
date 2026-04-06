import { Router } from "express";
import * as educationController from "./education.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/add", authMiddleware, educationController.addEducation);
router.get("/", educationController.getAllEducation);
router.get("/:id", educationController.getEducationById);
router.put("/:id", authMiddleware, educationController.updateEducation);
router.delete("/:id", authMiddleware, educationController.deleteEducation);

export default router;
