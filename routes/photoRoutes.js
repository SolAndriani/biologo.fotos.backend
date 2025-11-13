import express from "express";
import { upload, uploadMultiplePhotos, getPhotosByCategory, deletePhoto } from "../controllers/photoController.js";

const router = express.Router();

router.post("/upload", upload.array("photo"), uploadMultiplePhotos);

router.get("/category/:category", getPhotosByCategory);

router.delete("/delete", deletePhoto);

export default router;
