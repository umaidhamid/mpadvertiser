import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: "#",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Carousel = mongoose.model("Carousel", carouselSchema);

export default Carousel;
