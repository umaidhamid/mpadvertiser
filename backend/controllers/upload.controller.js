import fs from "fs";
import { parse } from "csv-parse";
import QRCode from "qrcode";

export const handleUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Parse content columns — can be a single string or array
    let contentColumns = req.body.contentColumns;
    const labelColumn = req.body.labelColumn;

    if (!labelColumn || !contentColumns) {
      return res.status(400).json({ error: "labelColumn and contentColumns are required" });
    }

    // Normalize contentColumns to array
    if (typeof contentColumns === "string") {
      contentColumns = contentColumns.split(",").map((c) => c.trim());
    }

    const rows = [];
    const parser = fs
      .createReadStream(req.file.path)
      .pipe(parse({ columns: true, trim: true }));

    for await (const record of parser) {
      rows.push(record);
    }

    fs.unlinkSync(req.file.path);

    if (!rows.length) return res.status(400).json({ error: "CSV is empty" });

    const results = [];
    let skipped = 0;

    for (const row of rows) {
      const label = row[labelColumn];

      // Skip if label is missing
      if (!label || label.trim() === "") {
        skipped++;
        continue;
      }

      // Check all content columns exist and are non-empty
      const missingField = contentColumns.some(
        (col) => !row[col] || row[col].trim() === ""
      );
      if (missingField) {
        skipped++;
        continue;
      }

      // Build QR content
      let qrContent;
      if (contentColumns.length === 1) {
        qrContent = row[contentColumns[0]];
      } else {
        const obj = {};
        for (const col of contentColumns) {
          obj[col] = row[col];
        }
        qrContent = JSON.stringify(obj);
      }

      // Generate QR code as base64 data URL
      const qrDataUrl = await QRCode.toDataURL(qrContent, {
        width: 300,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
      });

      results.push({
        label: label.trim(),
        qrContent,
        qr: qrDataUrl,
      });
    }

    res.json({ results, skipped, total: results.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process CSV" });
  }
};