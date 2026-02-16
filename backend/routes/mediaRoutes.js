import express from "express";
import { uploadMedia } from "../middeware/uploadMiddleware.js";
import {
  createCarousel,
  createGallery,
  createProduct,
} from "../controllers/mediaController.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post(
  "/carousel",
  
  uploadMedia("carousel", "files", 10),
  createCarousel
);

router.post(
  "/gallery",
  uploadMedia("gallery", "files", 20),
  createGallery
);

router.post(
  "/products",
  uploadMedia("products", "files", 5),
  createProduct
);

export default router;
