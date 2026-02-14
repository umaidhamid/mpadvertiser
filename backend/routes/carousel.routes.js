import express from "express";
import {
  createSlide,
  getAllSlides,
  deleteSlide,
  reorderSlides,
} from "../controllers/carousel.controller.js";

import { uploadSingleImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* Upload Slide */
router.post(
  "/create",
  uploadSingleImage("carousel", "image"),
  createSlide
);

/* Get Slides */
router.get("/get", getAllSlides);

/* Delete Slide */
router.delete("/delete/:id", deleteSlide);

/* Reorder */
router.put("/reorder", reorderSlides);

export default router;
