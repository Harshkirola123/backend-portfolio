import { Response, NextFunction } from "express";
import ErrorResponse from "../helper/errorResponse";
import { verifyAccessToken } from "../util/token";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ErrorResponse("Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    next(new ErrorResponse("Invalid or expired token", 401));
  }
};
