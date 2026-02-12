import express from "express";
import Gallery from "../models/Gallery.model.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/upload", authMiddleware, async (req, res) => {
  try {
    const { images } = req.body;

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image URL is required",
      });
    }

    const cleanImages = images
      .filter((img) => typeof img === "string" && img.trim())
      .map((img) => ({ image: img.trim() }));

    if (!cleanImages.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid image URLs",
      });
    }

    const savedImages = await Gallery.insertMany(cleanImages);

    res.status(201).json({
      success: true,
      message: "✅ Gallery images uploaded successfully!",
      data: savedImages,
    });
  } catch (error) {
    console.error("❌ Error uploading gallery:", error);
    res.status(500).json({
      success: false,
      message: "Server error while uploading gallery",
    });
  }
});

router.get("/get", async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: galleries,
    });
  } catch (error) {
    console.error("❌ Error fetching gallery:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching gallery",
    });
  }
});


router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "✅ Gallery deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting gallery:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting gallery",
    });
  }
});

export default router;
