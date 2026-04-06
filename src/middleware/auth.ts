import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../helper/errorResponse";
import { verifyAccessToken } from "../util/token";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ErrorResponse("Unauthorized", 401));
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    (req as any).user = decoded;

    next();
  } catch (error) {
    next(new ErrorResponse("Invalid or expired token", 401));
  }
};
