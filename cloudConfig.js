/**
 * Cloudinary Configuration
 * 
 * This file configures Cloudinary for image upload and storage.
 * Cloudinary is a cloud-based image management service that handles:
 * - Image uploads from users
 * - Image storage in the cloud
 * - Image transformations and optimization
 * 
 * It also sets up Multer storage to work with Cloudinary, which allows
 * Express to handle file uploads and automatically send them to Cloudinary.
 */

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

/**
 * Configure Cloudinary with API credentials from environment variables
 * 
 * These credentials are stored in the .env file for security:
 * - CLOUD_NAME: Your Cloudinary cloud name
 * - CLOUD_API_KEY: Your Cloudinary API key
 * - CLOUD_SECRET_KEY: Your Cloudinary secret key
 */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

/**
 * Configure Multer Storage for Cloudinary
 * 
 * This storage configuration tells Multer (file upload middleware) to:
 * - Store uploaded files in Cloudinary instead of the local filesystem
 * - Save files in a folder based on environment (development or production)
 * - Only accept PNG, JPG, and JPEG image formats
 */
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // Use environment variable for folder name, default to "nivaas_DEV" for development
    folder: process.env.CLOUDINARY_FOLDER || "nivaas_DEV",
    allowedFormat: ["png", "jpg", "jpeg"],
  },
});

// Export both cloudinary instance and storage configuration for use in other files
module.exports = {
  cloudinary: cloudinary,
  storage: cloudinaryStorage,
};
