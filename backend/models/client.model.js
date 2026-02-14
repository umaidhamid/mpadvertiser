import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
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
    website: {
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

const Client = mongoose.model("Client", clientSchema);

export default Client;
