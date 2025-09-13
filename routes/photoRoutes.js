import express from "express";
import { upload } from "../middleware/multer.js";
import { uploadPhoto, getPhotosByCategory, deletePhoto } from "../controllers/photoController.js";

const router = express.Router();


router.post("/upload", upload.single("photo"), uploadPhoto);


router.get("/category/:category", getPhotosByCategory);


router.delete("/delete", (req, res) => {
  const { username, password, category, filename } = req.body;

  if (username !== "Agustin" || password !== "123456") {
    return res.status(403).json({ msg: "Solo Agus puede eliminar fotos" });
  }

  deletePhoto(category, filename, res);
});

export default router;
