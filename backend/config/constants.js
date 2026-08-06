import { env } from "./env.js";

/* ================= CORS ================= */

export const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://mpadvertisers.umaidhamid.in",
  "https://www.mpadvertisers.umaidhamid.in",
  "https://mpadvertisers.vercel.app",
];

/* ================= AUTH / COOKIES ================= */

export const AUTH_COOKIE_NAME = "adminToken";
export const JWT_EXPIRES_IN = "7d";
export const AUTH_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.IS_PRODUCTION,
  sameSite: env.IS_PRODUCTION ? "none" : "lax",
};

/* ================= UPLOADS ================= */

export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];
export const CLOUDINARY_FOLDER_PREFIX = "mpadvertiser";

/* ================= PAGINATION ================= */

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_LIMIT = 10;
export const DEFAULT_GALLERY_PAGE_LIMIT = 8;

/* ================= ORDERS ================= */

export const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Completed",
  "Cancelled",
];
export const INVOICE_PREFIX = "INV-";
export const INVOICE_START_NUMBER = 1001;

/* ================= COUPONS ================= */

export const COUPON_TYPES = {
  PERCENTAGE: "percentage",
  FLAT: "flat",
};
