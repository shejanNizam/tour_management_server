import { NextFunction, Request, Response } from "express";

export default function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  //   const statusCode = 500;
  //   const message = err.message || "Something went wrong!";

  return res.status(500).json({
    success: false,
    message: err.message || "Something went wrong!",
    error: err,
  });
}
