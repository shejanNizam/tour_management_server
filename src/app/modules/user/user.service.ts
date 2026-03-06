import { configs } from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  let userData: Partial<TUser> = {};

  //   if password is not given set default password
  userData.password = password || (configs.default_password as string);

  //   set student role
  userData.role = "student";

  //   set manually generated id  ( dynamic in future )
  userData.id = "20301000001";

  //   create new user
  const newUser = await User.create(userData);

  //   create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // refference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
