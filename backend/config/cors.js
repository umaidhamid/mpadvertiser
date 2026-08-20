import { ALLOWED_ORIGINS } from "./constants.js";

export const corsOptions = {
  origin: function (origin, callback) {
    // allow server-to-server or Postman (no origin)
    if (!origin) return callback(null, true);

    if (ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
