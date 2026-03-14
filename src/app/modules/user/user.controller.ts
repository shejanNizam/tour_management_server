import httpStatus from "http-status";

import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserServices.createUser(req.body);
  // console.log(user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully!",
    data: user,
  });
});

const getAllUsers = async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users Retrieved successfully!",
    data: result.data,
    meta: result.meta,
  });
};

export const UserControllers = {
  createUser,
  getAllUsers,
};
