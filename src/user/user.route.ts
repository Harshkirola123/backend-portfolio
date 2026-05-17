import { Router } from "express";
import * as userController from "./user.controller";

const router = Router();

router.post("/", userController.createUser);
router.post("/login", userController.login);

router.post("/refresh-token", userController.refreshToken);
export default router;
