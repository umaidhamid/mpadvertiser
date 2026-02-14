import express from "express";
import {
    createClient,
    getClients,
    deleteClient,
    toggleClient,
    reorderClients,
} from "../controllers/client.controller.js";

import { uploadSingleImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
    "/create",
    uploadSingleImage("clients", "image"),
    createClient
);

router.get("/get", getClients);

router.delete("/delete/:id", deleteClient);

router.put("/toggle/:id", toggleClient);

router.put("/reorder", reorderClients);

export default router;
