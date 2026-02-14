import Team from "../models/team.model.js";
import { deleteImageFromCloudinary } from "../middleware/uploadMiddleware.js";

/* ================= CREATE ================= */

export const createTeamMember = async (req, res) => {
  try {
    const image = req.uploadedImage;

    const last = await Team.findOne().sort({ order: -1 });
    const nextOrder = last ? last.order + 1 : 0;

    const member = await Team.create({
      name: req.body.name,
      role: req.body.role,
      bio: req.body.bio,
      image: image.url,
      public_id: image.public_id,
      order: nextOrder,
    });

    res.status(201).json({
      success: true,
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET PUBLIC ================= */

export const getTeamMembers = async (req, res) => {
  try {
    const members = await Team.find({ isActive: true })
      .sort({ order: 1 });

    res.json({
      success: true,
      members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE ================= */

export const deleteTeamMember = async (req, res) => {
  const { id } = req.params;

  const member = await Team.findById(id);

  if (!member) {
    return res.status(404).json({
      success: false,
      message: "Member not found",
    });
  }

  await deleteImageFromCloudinary(member.public_id);
  await member.deleteOne();

  res.json({ success: true });
};

/* ================= TOGGLE ================= */

export const toggleTeamMember = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  await Team.findByIdAndUpdate(id, { isActive });

  res.json({ success: true });
};

/* ================= REORDER ================= */

export const reorderTeam = async (req, res) => {
  const updates = req.body.items;

  const bulkOps = updates.map((item) => ({
    updateOne: {
      filter: { _id: item.id },
      update: { order: item.order },
    },
  }));

  await Team.bulkWrite(bulkOps);

  res.json({ success: true });
};
