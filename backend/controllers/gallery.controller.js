import Gallery from "../models/gallery.model.js";
import { deleteImageFromCloudinary } from "../middleware/uploadMiddleware.js";

/* ================= CREATE MULTIPLE IMAGES ================= */

export const uploadGalleryImages = async (req, res) => {
  try {
    const images = req.uploadedImages;

    const savedImages = await Gallery.insertMany(images);

    res.status(201).json({
      success: true,
      message: "Images uploaded successfully",
      images: savedImages,
    });
  } catch (error) {
    console.error("Gallery upload error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL IMAGES ================= */

export const getAllGalleryImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    const total = await Gallery.countDocuments();

    const images = await Gallery.find()
      .sort({ order: 1 }) // use order instead of createdAt
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      images,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Get gallery error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= DELETE IMAGE ================= */

export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Gallery.findById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    await deleteImageFromCloudinary(image.public_id);
    await image.deleteOne();

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const reorderGallery = async (req, res) => {
  try {
    const updates = req.body.images;

    if (!updates || !Array.isArray(updates)) {
      return res.status(400).json({
        success: false,
        message: "Invalid reorder data",
      });
    }

    const bulkOps = updates.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { order: item.order },
      },
    }));

    await Gallery.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      message: "Gallery reordered successfully",
    });
  } catch (error) {
    console.error("Reorder error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};