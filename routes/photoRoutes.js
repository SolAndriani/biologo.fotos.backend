import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Photo from "../models/Photo.js"; // tu modelo de Mongoose

const router = express.Router();

// Configuración de almacenamiento con creación de carpetas automáticas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category;
    const uploadPath = path.join("uploads", category);

    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST subir foto
router.post("/upload", upload.single("photo"), async (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No se subió ningún archivo" });

  try {
    const newPhoto = await Photo.create({
      url: `/uploads/${req.body.category}/${req.file.filename}`,
      category: req.body.category
    });
    res.json(newPhoto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error guardando foto en la DB" });
  }
});

// GET fotos por categoría
router.get("/category/:category", async (req, res) => {
  try {
    const photos = await Photo.find({ category: req.params.category });
    // Devuelve array de urls
    res.json({ photos: photos.map(p => p.url) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error cargando fotos" });
  }
});

export default router;
