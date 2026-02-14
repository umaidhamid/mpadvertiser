import express from "express";
import {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
  reorderTestimonials,
  toggleTestimonial,
} from "../controllers/testimonial.controller.js";

const router = express.Router();

router.post("/create", createTestimonial);
router.get("/get", getTestimonials);
router.delete("/delete/:id", deleteTestimonial);
router.put("/reorder", reorderTestimonials);
router.put("/toggle/:id", toggleTestimonial);

export default router;
