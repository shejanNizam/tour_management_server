import bcrypt from "bcrypt";
import { configs } from "../config";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExists = await User.findOne({
      email: configs.super_admin_email as string,
    });

    if (isSuperAdminExists) {
      console.log("Super Admin already exists");
      return;
    }

    console.log("Trying to creating Super Admin...");

    const hashedSuperAdminPass = await bcrypt.hash(
      configs.super_admin_password as string,
      Number(configs.bcrypt_salt_round),
    );

    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: configs.super_admin_email as string,
    };

    const payload: Omit<IUser, "_id"> = {
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
      email: configs.super_admin_email as string,
      password: hashedSuperAdminPass,
      isVerified: true,
      auths: [authProvider],
    };

    const superAdmin = await User.create(payload);
    console.log("Super Admin created successfully.");
    console.log(superAdmin);
  } catch (error) {
    console.log(error);
  }
};
