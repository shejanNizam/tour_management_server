import z from "zod";

const userValidationSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password cannot exceed 30 characters" })
    .trim()
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
