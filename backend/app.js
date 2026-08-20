import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { corsOptions } from "./config/cors.js";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();

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

export default app;
