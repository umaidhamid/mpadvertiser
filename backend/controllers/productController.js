import Product from "../models/productModel.js";
import mongoose from "mongoose";
import { deleteImageFromCloudinary } from "../middleware/uploadMiddleware.js";

/* ================= CREATE PRODUCT ================= */
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            category,
            sku,
            price,
            discount,
            unit,
            material,
            deliveryTime,
            dimensions,
            description,
            featured,
            bestseller,
        } = req.body;

        /* ================= VALIDATION ================= */

        if (!name || !category || !sku || price == null) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing",
            });
        }

        const existingSKU = await Product.findOne({ sku });
        if (existingSKU) {
            return res.status(400).json({
                success: false,
                message: "SKU already exists",
            });
        }

        if (!req.uploadedImage) {
            return res.status(400).json({
                success: false,
                message: "Product image is required",
            });
        }

        /* ================= CREATE PRODUCT ================= */

        const product = await Product.create({
            name,
            category,
            sku,
            price: Number(price),
            discount: Number(discount) || 0,

            unit,
            material,
            deliveryTime,
            dimensions,
            description,
            featured: featured === "true" || featured === true,
            bestseller: bestseller === "true" || bestseller === true,

            // Save both URL + public_id
            image: {
                url: req.uploadedImage.url,
                public_id: req.uploadedImage.public_id,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        console.error("Create Product Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while creating product",
        });
    }
};

/* ================= GET ALL PRODUCTS ================= */

export const getProducts = async (req, res) => {
    try {
        let {
            page = 1,
            limit = 10,
            category,
            featured,
            bestseller,
            discountOnly,
            search,
            sort,
            min,
            max,
        } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const filter = {};

        if (category) filter.category = category;
        if (featured) filter.featured = featured === "true";
        if (bestseller) filter.bestseller = bestseller === "true";
        if (discountOnly === "true") filter.discount = { $gt: 0 };

        if (min || max) {
            filter.finalprice = {};
            if (min) filter.finalprice.$gte = Number(min);
            if (max) filter.finalprice.$lte = Number(max);
        }

        if (search) {
            filter.$text = { $search: search };
        }

        let sortOption = { createdAt: -1 };

        if (sort === "priceLow") sortOption = { finalprice: 1 };
        if (sort === "priceHigh") sortOption = { finalprice: -1 };
        if (sort === "discount") sortOption = { discount: -1 };

        const totalProducts = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            success: true,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
            products,
        });

    } catch (error) {
        console.error("Get Products Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching products",
        });
    }
};

/* ================= GET SINGLE PRODUCT ================= */

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });

    } catch (error) {
        console.error("Get Product Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching product",
        });
    }
};

/* ================= UPDATE PRODUCT ================= */

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (req.body.sku && req.body.sku !== product.sku) {
            const existingSKU = await Product.findOne({ sku: req.body.sku });
            if (existingSKU) {
                return res.status(400).json({
                    success: false,
                    message: "SKU already exists",
                });
            }
        }

        if (req.uploadedImage) {
            if (product.image?.public_id) {
                await deleteImageFromCloudinary(product.image.public_id);
            }
            product.image = req.uploadedImage;
        }

        Object.assign(product, req.body);

        const updatedProduct = await product.save();

        res.status(200).json({
            success: true,
            product: updatedProduct,
        });

    } catch (error) {
        console.error("Update Product Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while updating product",
        });
    }
};

/* ================= DELETE PRODUCT ================= */

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (product.image?.public_id) {
            await deleteImageFromCloudinary(product.image.public_id);
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted permanently",
        });

    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while deleting product",
        });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Product.aggregate([
            {
                $match: {
                    category: { $exists: true, $ne: null }
                }
            },
            {
                $group: {
                    _id: {
                        $trim: { input: { $toLower: "$category" } }
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const formattedCategories = categories.map(c =>
            c._id.charAt(0).toUpperCase() + c._id.slice(1)
        );

        res.status(200).json({
            success: true,
            count: formattedCategories.length,
            categories: formattedCategories,
        });

    } catch (error) {
        console.error("Get Categories Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching categories",
        });
    }
};