import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import cron from "node-cron";
import axios from "axios";
import offerRoutes from "./routes/offer.routes.js";
import morgan from "morgan";
import galleryRoutes from "./routes/gallery.routes.js";
import carouselRoutes from "./routes/carousel.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";

import clientRoutes from "./routes/client.routes.js";
import teamRoutes from "./routes/team.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(morgan("dev"));
const allowedOrigins = [
    "http://localhost:3000",
    "https://mpadvertisers.umaidhamid.in",
    "https://www.mpadvertisers.umaidhamid.in",
    "https://mpadvertisers.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow server-to-server or Postman (no origin)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("CORS not allowed for this origin"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes)
app.use("/products", productRoutes)
app.use("/offers", offerRoutes);
app.use("/testimonials", testimonialRoutes);
app.use("/gallery", galleryRoutes)
app.use("/clients", clientRoutes);

app.use("/team", teamRoutes);
app.use("/carousel", carouselRoutes);;
cron.schedule("*/10   * * * *", async () => {
    try {
        const [apiRes, siteRes] = await Promise.all([
            axios.get("https://mpadvertisers-backend.onrender.com/", { timeout: 8000 }),
            axios.get("https://www.umaidhamid.in/", { timeout: 8000 }),
        ]);

        console.log("Health check OK:", {
            api: apiRes.status,
            website: siteRes.status,
            time: new Date().toISOString(),
        });

    } catch (error) {
        console.error("Health check failed:", {
            message: error.message,
            url: error.config?.url,
            status: error.response?.status,
            time: new Date().toISOString(),
        });
    }
});
app.get("/", (req, res) => {
    res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
