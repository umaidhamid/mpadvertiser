import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./Database/database.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import cloudinaryRoute from "./routes/Cloudinary.route.js";
import cron from "node-cron"
import axios from "axios";
dotenv.config();


connectDB();
const app = express();

const allowedOrigins = [
  "http://localhost:5173", // for local dev
  "https://mp-advertisers.vercel.app", // your Vercel frontend
];


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // important for cookies / JWT
  })
);
cron.schedule(" */13  * * * *", async () => {
  try {
    const [apiRes, siteRes] = await Promise.all([
      axios.get("https://mp-advertisers.onrender.com", { timeout: 8000 }),
      axios.get("https://www.umaidhamid.in/", { timeout: 8000 }),
    ]);

    console.log("Health check OK:", {
      api: apiRes.status,
      website: siteRes.status,
    });
  } catch (error) {
    console.error("Health check failed:", {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
    });
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static("uploads")); // serve images or other static files

app.use("/api/cloudinary", cloudinaryRoute);
import ownerRoutes from "./routes/owner.routes.js";
app.use("/api/owners", ownerRoutes);
import productRoute from "./routes/product.route.js";
app.use("/api/product", productRoute);
import galleryRoute from "./routes/Gallery.route.js";
app.use("/api/gallery", galleryRoute);
// Example route
app.get("/", (req, res) => {
  res.send(" MP Advertisers backend is running!");
});
app.get("/api/owners/checkAuth", authMiddleware, (req, res) => {
  try {
    res.status(200).json({ isAuthenticated: true });
  } catch (e) {
    res.status(401).json({ isAuthenticated: false });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

