import { Router } from "express";
import * as projectController from "./project.controller";
import { authMiddleware } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = Router();

router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.post(
  "/add",
  authMiddleware,
  upload.array("images"),
  projectController.addProject,
);
router.patch(
  "/:id",
  authMiddleware,
  upload.array("images"),
  projectController.updateProject,
);
router.delete("/:id", authMiddleware, projectController.deleteProject);

export default router;
