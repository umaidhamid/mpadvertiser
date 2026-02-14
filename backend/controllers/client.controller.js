import Client from "../models/client.model.js";
import { deleteImageFromCloudinary } from "../middleware/uploadMiddleware.js";

/* ================= CREATE ================= */

export const createClient = async (req, res) => {
  try {
    const image = req.uploadedImage;

    const last = await Client.findOne().sort({ order: -1 });
    const nextOrder = last ? last.order + 1 : 0;

    const client = await Client.create({
      name: req.body.name,
      website: req.body.website,
      url: image.url,
      public_id: image.public_id,
      order: nextOrder,
    });

    res.status(201).json({
      success: true,
      client,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET PUBLIC ================= */

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find({ isActive: true })
      .sort({ order: 1 });

    res.json({
      success: true,
      clients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE ================= */

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    await deleteImageFromCloudinary(client.public_id);
    await client.deleteOne();

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

/* ================= TOGGLE ================= */

export const toggleClient = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  await Client.findByIdAndUpdate(id, { isActive });

  res.json({ success: true });
};

/* ================= REORDER ================= */

export const reorderClients = async (req, res) => {
  try {
    const updates = req.body.items;

    const bulkOps = updates.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { order: item.order },
      },
    }));

    await Client.bulkWrite(bulkOps);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
