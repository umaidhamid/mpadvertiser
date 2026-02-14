import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    buttonText: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "Claim Offer",
    },
    redirectUrl: {
      type: String,
      trim: true,
      default: "/Contact-Us",
    },
  },
  { timestamps: true }
);


export default mongoose.model("Offer", offerSchema);
