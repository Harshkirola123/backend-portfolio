import { Router } from "express";
import userRoute from "./user/user.route";
import educationRoute from "./education/education.route";
import certificateRoute from "./certifications/certification.route";

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
router.use("/certificate", certificateRoute);

export default router;
