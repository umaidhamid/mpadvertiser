import Coupon from "../models/Coupon.model.js";

export const validateCoupon = async (req, res) => {
    try {
        const { code, subtotal } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Coupon code required",
            });
        }

        const coupon = await Coupon.findOne({
            code: code.toUpperCase(),
            isActive: true,
        });

        if (!coupon) {
            return res.status(400).json({
                success: false,
                message: "Invalid coupon",
            });
        }

        if (coupon.expiresAt < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Coupon expired",
            });
        }

        if (subtotal < coupon.minOrder) {
            return res.status(400).json({
                success: false,
                message: `Minimum order ₹${coupon.minOrder} required`,
            });
        }

        if (
            coupon.usageLimit &&
            coupon.usedCount >= coupon.usageLimit
        ) {
            return res.status(400).json({
                success: false,
                message: "Coupon usage limit reached",
            });
        }

        let discount = 0;

        if (coupon.type === "percentage") {
            discount = (subtotal * coupon.value) / 100;
        } else {
            discount = coupon.value;
        }

        res.json({
            success: true,
            discount,
            couponId: coupon._id,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const createCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.create(req.body);

        res.json({
            success: true,
            coupon,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// GET ALL COUPONS (ADMIN)
export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            coupons,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE COUPON
export const deleteCoupon = async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Coupon deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// TOGGLE ACTIVE
export const toggleCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);

        coupon.isActive = !coupon.isActive;
        await coupon.save();

        res.json({
            success: true,
            coupon,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
