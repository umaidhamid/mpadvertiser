import express from "express";
import {
  createOffer,
  getLatestOffer,
} from "../controllers/offer.controller.js";

const router = express.Router();

router.post("/create", createOffer);
router.get("/latest", getLatestOffer);

export default router;
