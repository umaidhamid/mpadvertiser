import express from "express";
import {
  createTeamMember,
  getTeamMembers,
  deleteTeamMember,
  toggleTeamMember,
  reorderTeam,
} from "../controllers/team.controller.js";

import { uploadSingleImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  uploadSingleImage("team", "image"),
  createTeamMember
);

router.get("/get", getTeamMembers);

router.delete("/delete/:id", deleteTeamMember);

router.put("/toggle/:id", toggleTeamMember);

router.put("/reorder", reorderTeam);

export default router;
