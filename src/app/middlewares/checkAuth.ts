import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { configs } from "../config";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";

export const checkAuth =
  (...authRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "Please provide a valid access token.");
      }

      const verifiedToken = verifyToken(
        accessToken,
        configs.jwt_access_secret as string,
      ) as JwtPayload;

      if (!authRole.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to access this route.");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
