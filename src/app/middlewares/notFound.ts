import { Request, Response } from "express";

export default function notFound(
  req: Request,
  res: Response,
  // next: NextFunction
) {
  return res.status(404).json({
    success: false,
    message: "API not found",
    error: "",
  });
}
