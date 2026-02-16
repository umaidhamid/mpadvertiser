import express from "express";
import {
  createOffer,
  getLatestOffer,
} from "../controllers/offer.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/create", protect, createOffer);
router.get("/latest", getLatestOffer);

export default router;
