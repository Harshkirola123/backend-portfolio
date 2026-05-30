import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../helper/errorResponse";
import { verifyAccessToken } from "../util/token";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return next(new ErrorResponse("Unauthorized", 401));
    }

    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return next(new ErrorResponse("Unauthorized", 401));
    }

    (req as any).user = decoded;

    next();
  } catch (error) {
    next(new ErrorResponse("Invalid or expired token", 401));
  }
};
