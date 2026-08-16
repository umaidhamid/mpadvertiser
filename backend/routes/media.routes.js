import express from "express";
import { uploadMultipleImages } from "../middleware/upload.middleware.js";
import {
  createCarousel,
  createGallery,
  createProduct,
} from "../controllers/media.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post(
  "/carousel",
  protect,
  uploadMultipleImages("carousel", "files", 10),
  createCarousel
);

router.post(
  "/gallery",
  protect,
  uploadMultipleImages("gallery", "files", 20),
  createGallery
);

router.post(
  "/products",
  protect,
  uploadMultipleImages("products", "files", 5),
  createProduct
);

export default router;
