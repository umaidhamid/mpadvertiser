import express from "express";
import bcrypt, { genSalt, hash } from "bcryptjs";
import owner from "../models/owner.model.js";
import GenerateToken from "../utils/tokenGenerator.js";
const router = express.Router();

// Example route to create default owner
router.post("/createOwner", async (req, res) => {
  const { userName, Password } = req.body;
  console.log(userName);
  try {
    if (!userName || !Password) {
      return res.status(400).json("Username and password are required");
    }

    // Check if owner already exists
    const isExistUser = await owner.findOne({ userName });
    if (isExistUser) {
      return res.status(400).json("Username already exists");
    }

    // Generate salt and hash password
    const salt = await genSalt(12);
    const hashedPassword = await hash(Password, salt);
    // Create new owner
    const user = await owner.create({
      userName,
      Password: hashedPassword,
    });

    res.status(200).json({
      message: "Owner created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating owner:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/loginOwner", async (req, res) => {
  // console.log("BODY RECEIVED:", req.body);
  try {
    const { userName, Password } = req.body; // ✅ get from request body

    // 1️⃣ Validate inputs
    if (!userName || !Password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // 2️⃣ Check if user exists
    const User = await owner.findOne({ userName });
    if (!User) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // 3️⃣ Compare hashed password
    const isMatch = await bcrypt.compare(Password, User.Password); // ✅ use correct field name
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = GenerateToken(User._id);
    res.cookie("MpCookie", token, {
      httpOnly: true, // cannot be accessed via JS
      secure: process.env.NODE_ENV === "production", // ✅ true only on HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // ✅ allows cross-domain only in production
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      user: {
        id: User._id,
        userName: User.userName,
      },
      // token, // uncomment if using JWT
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
