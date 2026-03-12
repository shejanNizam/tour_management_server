/* eslint-disable no-console */
import httpStatus from "http-status";
import { User } from "./user.model";

import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const user = await User.create({
      name,
      email,
    });

    res.status(httpStatus.CREATED).json({
      message: "User created successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UserControllers = {
  createUser,
};
