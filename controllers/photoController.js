// controllers/photoController.js
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import Photo from "../models/Photo.js";
import cloudinary from "../config/cloudinaryConfig.js";

// Multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const category = (req.body.category || "otros").toLowerCase();
    return {
      folder: `biologo-fotos/${category}`,
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      transformation: [{ width: 2000, crop: "limit" }],
    };
  },
});

export const upload = multer({ storage });

// Subir foto
export const uploadPhoto = async (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No se subió ningún archivo" });

  try {
    const newPhoto = await Photo.create({
      url: req.file.path,           // URL pública de Cloudinary
      public_id: req.file.filename, // public_id para eliminar después
      category: (req.body.category || "otros").toLowerCase(),
    });

    res.status(201).json(newPhoto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error subiendo la foto", error: err.message });
  }
};

// Obtener fotos por categoría
export const getPhotosByCategory = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const photos = await Photo.find({ category });
    // Devuelve solo un array de URLs, compatible con PhotoGallery.jsx
    res.json({ photos: photos.map(p => p.url) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error obteniendo fotos", error: err.message });
  }
};

// Eliminar foto
export const deletePhoto = async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "public_id requerido" });

    // Borrar en Cloudinary
    await cloudinary.uploader.destroy(public_id);

    // Borrar en MongoDB
    await Photo.findOneAndDelete({ public_id });

    res.status(200).json({ msg: "Foto eliminada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error eliminando la foto", error: err.message });
  }
};
