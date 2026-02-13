import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";


dotenv.config();

const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:3000", // EXACT frontend URL
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes)
app.use("/products", productRoutes)


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
