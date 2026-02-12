import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  imageUrl: {
    type: String, // will store the Cloudinary URL
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0, // optional
  },
  unit: {
    type: String,
    // default: "piece", // e.g. 'piece', 'kg', etc.
    required: true,
  },
  finalprice: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
