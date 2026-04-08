/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  if (!email) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
  }

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User with this email not found");
  }

  const isPasswordMatch = await bcrypt.compare(
    password as string,
    isUserExist.password as string,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }

  const { password: _, ...rest } = isUserExist;

  return {
    email: isUserExist.email,
  };
};

export const AuthServices = {
  credentialLogin,
};
