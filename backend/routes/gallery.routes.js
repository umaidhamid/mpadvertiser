import express from "express";
import {
  uploadGalleryImages,
  getAllGalleryImages,
  deleteGalleryImage,
  reorderGallery
} from "../controllers/gallery.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { uploadMultipleImages } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* ================= ROUTES ================= */

// Upload Multiple Images
router.post(
  "/upload",
  protect,
  uploadMultipleImages("gallery", "images", 10),
  uploadGalleryImages
);

// Get All Images
router.get("/get",  getAllGalleryImages);

// Delete Image
router.delete("/delete/:id", protect, deleteGalleryImage);
router.put("/reorder", protect, reorderGallery);
export default router;
