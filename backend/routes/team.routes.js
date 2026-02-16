import express from "express";
import {
  createTeamMember,
  getTeamMembers,
  deleteTeamMember,
  toggleTeamMember,
  reorderTeam,
} from "../controllers/team.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { uploadSingleImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/create",protect,
  uploadSingleImage("team", "image"),
  createTeamMember
);

router.get("/get", getTeamMembers);

router.delete("/delete/:id",protect, deleteTeamMember);

router.put("/toggle/:id", protect, toggleTeamMember);

router.put("/reorder", protect, reorderTeam);

export default router;
