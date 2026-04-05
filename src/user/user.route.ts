import { Router } from "express";
import * as userController from "./user.controller";

const router = Router();

router.post("/", userController.createUser);
router.post("/login", userController.login);

export default router;
