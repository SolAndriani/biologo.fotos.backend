import fs from "fs";
import path from "path";

export const uploadPhoto = (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No se subió ningún archivo" });
    const category = req.body.category;
    if (!category) return res.status(400).json({ msg: "La categoría es obligatoria" });

    const dir = path.join("uploads", category);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const targetPath = path.join(dir, req.file.filename);
    fs.renameSync(req.file.path, targetPath);

    const url = `/uploads/${category}/${req.file.filename}`;
    res.status(201).json({ url, category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error subiendo la foto", error: err.message });
  }
};

export const getPhotosByCategory = (req, res) => {
  try {
    const category = req.params.category;
    const dir = path.join("uploads", category);
    if (!fs.existsSync(dir)) return res.json({ photos: [] });

    const files = fs.readdirSync(dir);
    const urls = files.map(file => `/uploads/${category}/${file}`);
    res.json({ photos: urls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error obteniendo fotos" });
  }
};

export const deletePhoto = (category, filename, res) => {
  try {
    if (!category || !filename) return res.status(400).json({ msg: "Categoría y archivo requeridos" });

    const filePath = path.join("uploads", category, filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ msg: "Archivo no encontrado" });

    fs.unlinkSync(filePath);
    res.status(200).json({ msg: "Foto eliminada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error eliminando la foto", error: err.message });
  }
};
