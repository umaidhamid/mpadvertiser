
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import { env } from "./config/env.js";
import { corsOptions } from "./config/cors.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import { connectDB } from "./config/db.js";


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

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(env.PORT, () => {
            console.log(`Server running on port ${env.PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
