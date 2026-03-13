import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;

  if (!name || !email) {
    throw new Error("Name and Email are required");
  }

  const user = await User.create({
    name,
    email,
  });

  return user;
};

const getAllUsers = async () => {
  const users = await User.find({});

  return users;
};

export const UserServices = {
  createUser,
  getAllUsers,
};
