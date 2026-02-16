import express from "express";
import {
    createOrder,
    getOrders,
    getSingleOrder,
    updateOrderStatus,
    deleteOrder,
} from "../controllers/order.Controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/create", createOrder);
router.get("/get", protect, getOrders);
router.get("/:id", getSingleOrder);
router.put("/:id/status", updateOrderStatus);
router.delete("/:id",protect, deleteOrder);

export default router;
