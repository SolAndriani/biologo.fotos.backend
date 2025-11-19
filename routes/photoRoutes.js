import express from "express";
import multer from "multer";
import { uploadPhoto, getPhotosByCategory } from "../controllers/photoController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/upload", upload.single("photo"), uploadPhoto);
router.get("/category/:category", getPhotosByCategory);

export default router;
