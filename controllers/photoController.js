import Photo from "../models/Photo.js";

export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No se subió ninguna imagen" });
    }

    const { title, category } = req.body;

    if (!category) {
      return res.status(400).json({ msg: "Debe seleccionar una categoría" });
    }

    const newPhoto = new Photo({
      title: title || "Sin título",
      category,
      url: `/uploads/${req.file.filename}`,
    });

    await newPhoto.save();

    res.json({ msg: "Foto subida correctamente", photo: newPhoto });
  } catch (err) {
    console.error("Error al subir foto:", err);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
