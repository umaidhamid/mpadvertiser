import Testimonial from "../models/testimonial.model.js";

/* ================= CREATE ================= */

export const createTestimonial = async (req, res) => {
    try {
        const last = await Testimonial.findOne().sort({ order: -1 });
        const nextOrder = last ? last.order + 1 : 0;

        const testimonial = await Testimonial.create({
            ...req.body,
            order: nextOrder,
        });

        res.status(201).json({
            success: true,
            testimonial,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ================= GET (PUBLIC) ================= */

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({
            isActive: true,
        }).sort({ order: 1 });

        res.status(200).json({
            success: true,
            testimonials,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ================= DELETE ================= */

export const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;

        await Testimonial.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ================= REORDER ================= */

export const reorderTestimonials = async (req, res) => {
    try {
        const updates = req.body.items;

        const bulkOps = updates.map((item) => ({
            updateOne: {
                filter: { _id: item.id },
                update: { order: item.order },
            },
        }));

        await Testimonial.bulkWrite(bulkOps);

        res.json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const toggleTestimonial = async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;

    await Testimonial.findByIdAndUpdate(id, {
        isActive,
    });

    res.json({ success: true });
};
