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

const missingEnvVars = REQUIRED_ENV_VARS.filter(
  (key) => !process.env[key] || !process.env[key].trim()
);

if (missingEnvVars.length > 0) {
  console.error("\nMissing required environment variable(s):");
  missingEnvVars.forEach((key) => console.error(`  - ${key}`));
  console.error(
    "\nCopy backend/.env.example to backend/.env and fill in the missing values.\n"
  );
  process.exit(1);
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",

  PORT: process.env.PORT || 5000,

  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export default env;
