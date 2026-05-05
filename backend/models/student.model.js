import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true,
      trim: true,
    },
    // email: {
    //   type: String,
    //   required: [true, "Email is required"],
    //   unique: true,
    //   lowercase: true,
    //   trim: true,
    // },
    // phone: {
    //   type: String,
    //   trim: true,
    // },
    class: {
      type: String,
      required: [true, "Class is required"],
      trim: true,
    },
    // section: {
    //   type: String,
    //   trim: true,
    // },
    // photo: {
    //   type: String, // base64 encoded image string
    //   required: [true, "Photo is required"],
    // },
    // address: {
    //   type: String,
    //   trim: true,
    // },
    // dateOfBirth: {
    //   type: Date,
    // },
    // guardianName: {
    //   type: String,
    //   trim: true,
    // },
    // guardianPhone: {
    //   type: String,
    //   trim: true,
    // },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", studentSchema);