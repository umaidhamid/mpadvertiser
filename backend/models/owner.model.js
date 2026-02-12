import mongoose, { Schema } from "mongoose";
const OwnerScheme = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
  },
  { timestamps: true }
);
const owner = mongoose.model("Owner", OwnerScheme);
export default owner;
