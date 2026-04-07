import { Router } from "express";
import * as certificateController from "./certification.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, certificateController.addCertification);
router.get("/", certificateController.getAllCertifications);
router.get("/:id", certificateController.getCertificationById);
router.patch("/:id", authMiddleware, certificateController.updateCertification);
router.delete(
  "/:id",
  authMiddleware,
  certificateController.deleteCertification,
);
router.patch(
  "/:id/toggle",
  authMiddleware,
  certificateController.toggleCertificationStatus,
);

export default router;
