import express from "express";
import {
    createClient,
    getClients,
    deleteClient,
    toggleClient,
    reorderClients,
} from "../controllers/client.controller.js";

import { uploadSingleImage } from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post(
    "/create",
    protect,
    uploadSingleImage("clients", "image"),
    createClient
);

router.get("/get", getClients);

router.delete("/delete/:id", protect, deleteClient);

router.put("/toggle/:id", protect, toggleClient);

router.put("/reorder", protect, reorderClients);

export default router;
