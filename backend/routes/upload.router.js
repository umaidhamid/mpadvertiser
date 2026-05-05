import express from "express";
import multer from "multer";
import fs from "fs";
import { parse } from "csv-parse";
import { handleUpload } from "../controllers/upload.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), handleUpload);

router.post("/headers", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const rows = [];
    const parser = fs
      .createReadStream(req.file.path)
      .pipe(parse({ columns: true, trim: true }));

    for await (const record of parser) {
      rows.push(record);
      break;
    }

    fs.unlinkSync(req.file.path);

    if (!rows[0]) return res.status(400).json({ error: "Empty CSV" });

    res.json({ headers: Object.keys(rows[0]) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read headers" });
  }
});
import QRCode from "qrcode";

// Add this route alongside existing ones
router.post("/generate-link-qr", async (req, res) => {
  try {
    const { link, label } = req.body;

    if (!link || link.trim() === "") {
      return res.status(400).json({ error: "Link is required" });
    }

    // Basic URL validation
    let url;
    try {
      url = new URL(link.trim());
    } catch {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    const qrDataUrl = await QRCode.toDataURL(url.href, {
      width: 300,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    });

    res.json({
      label: label?.trim() || url.hostname,
      qrContent: url.href,
      qr: qrDataUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate QR" });
  }
});
export default router;