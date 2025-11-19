import express from "express";
import { 
  upload, 
  uploadMultiplePhotos, 
  getPhotosByCategory 
} from "../controllers/photoController.js";

const router = express.Router();


router.post("/upload", upload, uploadMultiplePhotos);

router.get("/category/:category", getPhotosByCategory);

export default router;
