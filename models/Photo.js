import express from "express";
import Photo from "../models/Photo.js";

const router = express.Router();

// Obtener fotos por categoría
router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const photos = await Photo.find({ category }).sort({ _id: -1 }); // más recientes primero
    res.json(photos); // ahora devuelve directamente un array
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
