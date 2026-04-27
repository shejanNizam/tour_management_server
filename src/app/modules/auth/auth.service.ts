import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { configs } from "../../config";
import AppError from "../../errorHelpers/AppError";
import { genarateToken } from "../../utils/jwt";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  if (!email) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
  }

  const isUserExist = await User.findOne({ email }).select("+password");

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

  const jwtPayload = {
    _id: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  // genarate access token
  const accessToken = genarateToken(
    jwtPayload,
    configs.jwt_access_secret as string,
    configs.jwt_access_expires as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  credentialLogin,
};
