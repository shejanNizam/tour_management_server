import { model, Schema } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentName,
} from "./student.interface";

const studentNameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxLength: [20, "Max length more than 20 characters"],
  },
  middleName: {
    type: String,
    trim: true,
    maxLength: [20, "Max length more than 20 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    maxLength: [20, "Max length more than 20 characters"],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occopation name is required"],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact no is required"],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's conntact no is required"],
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian name is required"],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, "Local guardian occupation is required"],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian contact no is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Local guardian address is required"],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id id required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: studentNameSchema,
      required: [true, "Student name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender`,
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    contactNo: {
      type: String,
      required: [true, "Contact no is required"],
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact no is required"],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: [true, "Blood group is required"],
    },
    presentAddress: {
      type: String,
      required: [true, "Present Address is required"],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanennt address is required"],
      trim: true,
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian information is required"],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local guardian information is required"],
    },
    profileImage: {
      type: String,
      required: [true, "Profile image is required"],
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

export const Student = model("Student", studentSchema);
