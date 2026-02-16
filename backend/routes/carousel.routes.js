import express from "express";
import {
  createSlide,
  getAllSlides,
  deleteSlide,
  reorderSlides,
} from "../controllers/carousel.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { uploadSingleImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* Upload Slide */
router.post(
  "/create",
  uploadSingleImage("carousel", "image"),
  protect,
  createSlide
);

/* Get Slides */
router.get("/get", getAllSlides);

/* Delete Slide */
router.delete("/delete/:id", protect, deleteSlide);

/* Reorder */
router.put("/reorder", protect, reorderSlides);

export default router;
