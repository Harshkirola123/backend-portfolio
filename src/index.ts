import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { env } from "./config/config";
import router from "./router";
import connectDB from "./config/db";
import ErrorResponse from "./helper/errorResponse";
import asyncHandler from "./helper/asyncHandler";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "API is running 🚀",
    });
  }),
);

app.use("/api", router);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use(
  (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.message);

    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && {
        stack: err.stack,
      }),
    });
  },
);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
