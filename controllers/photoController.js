import Photo from "../models/Photo.js";

export const uploadPhoto = async (req, res) => {
  try {
    const { url, category, public_id } = req.body;
    if (!url || !category || !public_id) {
      return res.status(400).json({ msg: "Faltan datos: url, category o public_id" });
    }

    const newPhoto = new Photo({ url, category, public_id });
    await newPhoto.save();

    res.status(201).json({ msg: "Foto subida correctamente ✅", photo: newPhoto });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error subiendo foto", error: err });
  }
};

export const getPhotosByCategory = async (req, res) => {
  try {
    const photos = await Photo.find({ category: req.params.category });
    res.json(photos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error obteniendo fotos", error: err });
  }
};
