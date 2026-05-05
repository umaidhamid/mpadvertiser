import express from "express";
import { uploadSingleImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();
import {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
} from "../controllers/student.controller.js";

// POST   /api/students       → Register new student
router.post(
  "/",
  uploadSingleImage("students", "photo"), // 👈 IMPORTANT
  createStudent
);
// GET    /api/students       → List all students (with pagination & filters)
router.get("/", getAllStudents);

// GET    /api/students/:id   → Get single student
router.get("/:id", getStudentById);
router.delete("/:id", deleteStudent);

export default router;