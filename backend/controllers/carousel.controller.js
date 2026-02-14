import Carousel from "../models/carousel.model.js";
import { deleteImageFromCloudinary } from "../middleware/uploadMiddleware.js";

/* ================= CREATE SLIDE ================= */

export const createSlide = async (req, res) => {
  try {
    const { title, link } = req.body;
    const image = req.uploadedImage;

    const lastSlide = await Carousel.findOne().sort({ order: -1 });
    const nextOrder = lastSlide ? lastSlide.order + 1 : 0;

    const slide = await Carousel.create({
      title,
      link,
      url: image.url,
      public_id: image.public_id,
      order: nextOrder,
    });

    res.status(201).json({
      success: true,
      slide,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL SLIDES (PUBLIC) ================= */

export const getAllSlides = async (req, res) => {
  try {
    const slides = await Carousel.find({ isActive: true })
      .sort({ order: 1 });

    res.status(200).json({
      success: true,
      slides,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE SLIDE ================= */

export const deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;

    const slide = await Carousel.findById(id);

    if (!slide) {
      return res.status(404).json({
        success: false,
        message: "Slide not found",
      });
    }

    await deleteImageFromCloudinary(slide.public_id);
    await slide.deleteOne();

    res.json({
      success: true,
      message: "Slide deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= REORDER ================= */

export const reorderSlides = async (req, res) => {
  try {
    const updates = req.body.slides;

    const bulkOps = updates.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { order: item.order },
      },
    }));

    await Carousel.bulkWrite(bulkOps);

    res.json({
      success: true,
      message: "Order updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
