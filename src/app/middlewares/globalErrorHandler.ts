/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

export default function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return res.status(500).json({
    success: false,
    message: err.message || "Something went wrong!",
    error: err,
  });
}
