import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: String,
    company: String,
    location: String,
    project: String,
    date: String,

    text: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model(
  "Testimonial",
  testimonialSchema
);

export default Testimonial;
