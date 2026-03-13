import httpStatus from "http-status";

import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      message: "User created successfully!",
      user,
    });
  },
);

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await UserServices.getAllUsers();

  res.status(httpStatus.OK).json({
    success: true,
    message: "All users retrive successfully!",
    data: users,
  });
};

export const UserControllers = {
  createUser,
  getAllUsers,
};
