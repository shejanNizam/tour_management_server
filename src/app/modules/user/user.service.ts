import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;

  if (!name || !email) {
    throw new Error("Name or Email are required");
  }

  const user = await User.create({
    name,
    email,
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
