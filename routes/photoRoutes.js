import express from "express";
import { upload, uploadPhoto, getPhotosByCategory, deletePhoto } from "../controllers/photoController.js";

const router = express.Router();


router.post("/upload", upload.single("photo"), uploadPhoto);


router.get("/category/:category", getPhotosByCategory);


router.delete("/delete", deletePhoto);

export default router;
