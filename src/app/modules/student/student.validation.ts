import { z } from "zod";

/* Student Name */
const studentNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(20, "Max length more than 20 characters")
    .trim(),

  middleName: z
    .string()
    .max(20, "Max length more than 20 characters")
    .trim()
    .optional(),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(20, "Max length more than 20 characters")
    .trim(),
});

/* Guardian */
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required").trim(),
  fatherOccupation: z.string().min(1, "Father's occupation is required").trim(),
  fatherContactNo: z.string().min(1, "Father's contact no is required").trim(),

  motherName: z.string().min(1, "Mother's name is required").trim(),
  motherOccupation: z.string().min(1, "Mother's occupation is required").trim(),
  motherContactNo: z.string().min(1, "Mother's contact no is required").trim(),
});

/* Local Guardian */
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian name is required").trim(),
  occupation: z.string().min(1, "Local guardian occupation is required").trim(),
  contactNo: z.string().min(1, "Local guardian contact no is required").trim(),
  address: z.string().min(1, "Local guardian address is required").trim(),
});

/* Student */
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(1, "Password is required"),
    student: z.object({
      name: studentNameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().min(1, "Date of birth is required"),
      email: z
        .string()
        .email("Invalid email address")
        .min(1, "Email is required"),
      contactNo: z.string().min(1, "Contact no is required").trim(),
      emergencyContactNo: z
        .string()
        .min(1, "Emergency contact no is required")
        .trim(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      presentAddress: z.string().min(1, "Present address is required").trim(),
      permanentAddress: z
        .string()
        .min(1, "Permanent address is required")
        .trim(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImage: z.string().min(1, "Profile image is required"),
      isActive: z.enum(["active", "blocked"]).default("active"),
      isDeleted: z.boolean().optional().default(false),
    }),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
};
