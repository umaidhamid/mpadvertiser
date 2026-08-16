import express from "express";
import {
    createProduct,
    getProducts,
    getProductBySlug,

    deleteProduct,
    getAllCategories,
    getAllProductSlugs,
    updateProductWithoutImage,
    updateProductImage
} from "../controllers/product.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { uploadSingleImage } from "../middleware/upload.middleware.js";

const router = express.Router();

/* ================= COLLECTION ROUTES ================= */
router.get("/categories", getAllCategories);
// GET all products
router.get("/get", getProducts);
router.get("/sitemap-products", getAllProductSlugs);
// POST create new product with image
router.post(
    "/",
    protect,
    uploadSingleImage("products", "image"), // field name = image
    createProduct
);


/* ================= SINGLE PRODUCT ROUTES ================= */

// GET single product
router.get("/:slug", getProductBySlug);

// UPDATE product (optional new image)
router.put(
    "/:slug/image",
    protect,
    uploadSingleImage("products", "image"),
    updateProductImage
);
router.put("/:slug", protect, updateProductWithoutImage);
// DELETE product (with image delete inside controller)
router.delete("/:id", protect, deleteProduct);

export default router;
