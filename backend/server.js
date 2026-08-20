
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import { env } from "./config/env.js";
import { corsOptions } from "./config/cors.js";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.routes.js";
import offerRoutes from "./routes/offer.routes.js";
import morgan from "morgan";
import galleryRoutes from "./routes/gallery.routes.js";
import carouselRoutes from "./routes/carousel.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import clientRoutes from "./routes/client.routes.js";
import teamRoutes from "./routes/team.routes.js";
import couponsRoute from "./routes/coupon.routes.js"
import orderRoutes from "./routes/order.routes.js";
import uploadRoute from "./routes/upload.routes.js";
import studentRoutes from "./routes/student.routes.js";


const app = express();

// Middleware
app.use(morgan("dev"));

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes)
app.use("/products", productRoutes)
app.use("/offers", offerRoutes);
app.use("/testimonials", testimonialRoutes);
app.use("/gallery", galleryRoutes)
app.use("/clients", clientRoutes);
app.use("/coupons", couponsRoute);
app.use("/orders", orderRoutes);
app.use("/team", teamRoutes);
app.use("/carousel", carouselRoutes);
app.use("/uploadcsv", uploadRoute);
app.use("/students", studentRoutes);

app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

const startServer = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);
        app.listen(env.PORT, () => {
            console.log(`Server running on port ${env.PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
