import { RequestHandler } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student is created successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
