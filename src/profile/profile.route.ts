import { Router } from "express";
import * as profileController from "./profile.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", profileController.getProfile);
router.patch("/", authMiddleware, profileController.upsertProfile);

export default router;
