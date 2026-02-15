import express from "express";
import {
    createOrder,
    getOrders,
    getSingleOrder,
    updateOrderStatus,
    deleteOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/get", getOrders);
router.get("/:id", getSingleOrder);
router.put("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
