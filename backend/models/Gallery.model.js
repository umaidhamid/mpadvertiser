import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", GallerySchema);
