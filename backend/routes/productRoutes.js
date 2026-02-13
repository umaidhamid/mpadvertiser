import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllCategories
} from "../controllers/productController.js";

import { uploadSingleImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* ================= COLLECTION ROUTES ================= */
router.get("/categories", getAllCategories);
// GET all products
router.get("/get", getProducts);

// POST create new product with image
router.post(
    "/",
    uploadSingleImage("products", "image"), // field name = image
    createProduct
);


/* ================= SINGLE PRODUCT ROUTES ================= */

// GET single product
router.get("/:id", getProductById);

// UPDATE product (optional new image)
router.put(
    "/:id",
    uploadSingleImage("products", "image"),
    updateProduct
);

// DELETE product (with image delete inside controller)
router.delete("/:id", deleteProduct);

export default router;
