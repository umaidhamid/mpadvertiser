import mongoose from "mongoose";
const connectDB = async (req, res) => {
  const connect = await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDb is connected ");
    })
    .catch((e) => {
      console.log("Error in connecting mongoDb");
      process.exit(1);
    });
};
export default connectDB;
