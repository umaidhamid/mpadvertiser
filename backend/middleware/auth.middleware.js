import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    console.log("Incoming cookies:", req.cookies);

    const token = req.cookies?.adminToken;

    if (!token) {
      console.log("No token found");
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log("User not found in DB");
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log("JWT Error:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
