import { Types } from "mongoose";
import { Student } from "./student.model";

const getAllStudentsFromDB = async () => {
  const result = await Student.find({ isDeleted: false });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
  ]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne(
    { _id: new Types.ObjectId(id), isDeleted: false },
    { isDeleted: true }
  );
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
