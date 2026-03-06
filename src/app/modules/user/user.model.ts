import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { configs } from "../../config";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const user = this;
  // console.log(user);
  user.password = await bcrypt.hash(
    user.password,
    Number(configs.bcrypt_salt_rounds)
  );
});

userSchema.post("save", async function (savedDoc, next) {
  savedDoc.password = "";
  next();
});

export const User = model<TUser>("User", userSchema);
