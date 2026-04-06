import { Router } from "express";
import userRoute from "./user/user.route";
import educationRoute from "./education/education.route";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.use("/user", userRoute);

router.use("/education", educationRoute);

export default router;
