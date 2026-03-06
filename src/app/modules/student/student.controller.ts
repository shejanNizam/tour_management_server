import { RequestHandler } from "express";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";

//  get all students
const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Students are retrive successfully",
    data: result,
    total: result.length,
  });
});

// get single student
const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  if (!studentId) {
    throw new Error("Student ID is required");
  }
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student is retrived successfully",
    data: result,
  });
});

//  delete a student
const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  if (!studentId) {
    throw new Error("Student ID is required");
  }
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student is deleted successfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
