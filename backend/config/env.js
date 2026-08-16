import dotenv from "dotenv";

dotenv.config();

// Environment variables the server cannot start without.
const REQUIRED_ENV_VARS = [
  "MONGO_URI",
  "JWT_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const required = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const missingEnvVars = REQUIRED_ENV_VARS.filter(
  (key) => !process.env[key] || !process.env[key].trim()
);

if (missingEnvVars.length > 0) {
  console.error("\nMissing required environment variable(s):");
  missingEnvVars.forEach((key) => console.error(`  - ${key}`));
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",

  PORT: process.env.PORT || 5000,

  MONGO_URI: required("MONGO_URI"),
  JWT_SECRET: required("JWT_SECRET"),

  CLOUDINARY_CLOUD_NAME: required("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: required("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: required("CLOUDINARY_API_SECRET"),
};

export default env;
