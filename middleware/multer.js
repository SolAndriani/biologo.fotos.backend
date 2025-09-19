// middleware/multer.js
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Configuración del storage de Multer con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "photos", // Carpeta en Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 1200, height: 1200, crop: "limit" }],
  },
});

// Middleware de Multer
const upload = multer({ storage });

export default upload;
