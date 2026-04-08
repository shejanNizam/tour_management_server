import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = await AuthServices.credentialLogin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User loggedin successfully!",
    data: loginInfo,
  });
});

export const AuthControllers = {
  credentialsLogin,
};
