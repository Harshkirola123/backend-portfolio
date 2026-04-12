import { Router } from "express";
import userRoute from "./user/user.route";
import educationRoute from "./education/education.route";
import certificateRoute from "./certifications/certification.route";
import experienceRoute from "./experience/experience.route";
import projectRoute from "./project/project.route";
import profileRoute from "./profile/profile.route";

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
router.use("/experience", experienceRoute);
router.use("/project", projectRoute);
router.use("/profile", profileRoute);

export default router;
