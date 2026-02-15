import express from "express";
import {
    createCoupon,
    validateCoupon,
    getCoupons,
    deleteCoupon,
    toggleCoupon,
} from "../controllers/couponController.js";

const router = express.Router();

router.post("/create", createCoupon);
router.post("/validate", validateCoupon);
router.get("/get", getCoupons);
router.delete("/delete/:id", deleteCoupon);
router.put("/toggle/:id", toggleCoupon);

export default router;
