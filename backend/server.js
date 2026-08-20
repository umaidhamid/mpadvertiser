
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import { env } from "./config/env.js";
import { corsOptions } from "./config/cors.js";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index.js";


const app = express();

// Middleware
app.use(morgan("dev"));

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(routes);

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
