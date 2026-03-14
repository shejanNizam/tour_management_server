import httpStatus from "http-status";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { email, ...rest } = payload;

  if (!email) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is required!");
  }

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists!");
  }

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email,
  };

  const user = await User.create({
    email,
    auths: [authProvider],
    ...rest,
  });

  return user;
};

const getAllUsers = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();

  return {
    data: users,
    meta: totalUsers,
  };
};

export const UserServices = {
  createUser,
  getAllUsers,
};
