import express from "express";
import { uploadPhoto, getPhotosByCategory } from "../controllers/photoController.js";

const router = express.Router();

router.post("/upload", uploadPhoto);

router.get("/category/:category", getPhotosByCategory);

export default router;
