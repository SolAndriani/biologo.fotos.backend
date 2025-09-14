import express from "express";
import multer from "multer";
import Photo from "../models/Photo.js";
import path from "path";

const router = express.Router();

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Subir foto
router.post("/upload", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No se subió ningún archivo" });

    // Normalizamos categoría
    const category = req.body.category.toLowerCase().replace(/\s/g, "");

    const newPhoto = new Photo({
      url: `/uploads/${req.file.filename}`,
      category,
    });

    await newPhoto.save();
    res.json({ url: newPhoto.url, category: newPhoto.category });
  } catch (err) {
    console.error("Error subiendo la foto:", err);
    res.status(500).json({ msg: "Error subiendo la foto" });
  }
});

// Obtener fotos por categoría
router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category.toLowerCase().replace(/\s/g, "");
    const photos = await Photo.find({ category });
    res.json(photos);
  } catch (err) {
    console.error("Error cargando fotos:", err);
    res.status(500).json({ msg: "Error cargando fotos" });
  }
});

export default router;
