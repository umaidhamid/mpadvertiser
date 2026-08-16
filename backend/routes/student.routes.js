 import express from "express";
import { uploadSingleImage } from "../middleware/upload.middleware.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
import {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
} from "../controllers/student.controller.js";

// POST   /students       → Register new student
router.post(
  "/",
  protect,
  uploadSingleImage("students", "photo"),
  createStudent
);
// GET    /api/students       → List all students (with pagination & filters)
router.get("/", getAllStudents);

// GET    /api/students/:id   → Get single student
router.get("/:id", getStudentById);
router.delete("/:id", protect, deleteStudent);

export default router;