
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/* ================= MULTER CONFIG (IMAGES ONLY) ================= */

const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB for images
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Only JPG, PNG, WEBP images allowed"));
    } else {
      cb(null, true);
    }
  },
});

/* ================= CLOUDINARY UPLOAD ================= */

const uploadToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          {
            width: 1000,
            height: 1000,
            crop: "limit",
            quality: "auto",
            fetch_format: "auto",
          },
        ],
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

/* ================= SINGLE IMAGE UPLOAD ================= */

export const uploadSingleImage = (folder, fieldName = "image") => [
  multerUpload.single(fieldName),

  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image is required",
        });
      }

      const result = await uploadToCloudinary(
        req.file,
        `mpadvertiser/${folder}`
      );

      req.uploadedImage = result;

      next();
    } catch (error) {
      console.error("Single upload error:", error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];

/* ================= MULTIPLE IMAGE UPLOAD ================= */

export const uploadMultipleImages = (folder, fieldName = "images", maxCount = 10) => [
  multerUpload.array(fieldName, maxCount),

  async (req, res, next) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one image is required",
        });
      }

      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file, `mpadvertiser/${folder}`)
      );

      const uploadedImages = await Promise.all(uploadPromises);

      req.uploadedImages = uploadedImages;

      next();
    } catch (error) {
      console.error("Multiple upload error:", error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];

/* ================= DELETE IMAGE FROM CLOUDINARY ================= */

export const deleteImageFromCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);

    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
};
