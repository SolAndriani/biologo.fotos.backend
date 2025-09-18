// config/upload.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "dmixd7wpb",
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    // req.body.folder debería llegar desde el frontend
    return {
      folder: `biologo-fotos/${req.body.folder || "otros"}`,
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      transformation: [{ width: 2000, crop: "limit" }],
    };
  },
});

export const upload = multer({ storage });
