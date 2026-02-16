import express from "express";
import {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
  reorderTestimonials,
  toggleTestimonial,
} from "../controllers/testimonial.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", createTestimonial);
router.get("/get", getTestimonials);
router.delete("/delete/:id",protect, deleteTestimonial);
router.put("/reorder", protect, reorderTestimonials);
router.put("/toggle/:id", protect, toggleTestimonial);

export default router;
