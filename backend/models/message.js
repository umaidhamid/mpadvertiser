import mongoose, { Schema } from "mongoose";
const messageScheme = new mongoose.Schema(
  {
    message: { type: String },
  },
  { timestamps: true }
);
const message = mongoose.model("message", messageScheme);
export default message;
