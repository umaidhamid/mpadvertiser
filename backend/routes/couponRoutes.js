import express from "express";
import {
    createCoupon,
    validateCoupon,
    getCoupons,
    deleteCoupon,
    toggleCoupon,
} from "../controllers/couponController.js";

import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/create", protect, createCoupon);
router.post("/validate", validateCoupon);
router.get("/get", protect, getCoupons);
router.delete("/delete/:id", protect, deleteCoupon);
router.put("/toggle/:id", protect, toggleCoupon);

export default router;
