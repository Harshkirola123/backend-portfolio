import { Router } from "express";
import * as userController from "./user.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", userController.createUser);
router.post("/login", userController.login);

router.post("/refresh-token", userController.refreshToken);
router.post("/logout", userController.logout);
router.get("/", authMiddleware, userController.getUserDetail);

export default router;
