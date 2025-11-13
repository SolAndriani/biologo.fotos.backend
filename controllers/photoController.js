export const getPhotosByCategory = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const photos = await Photo.find({ category });

    
    if (!photos || photos.length === 0) {
      console.log(`No se encontraron fotos para la categoría: ${category}`);
      return res.json({ photos: [] });
    }


    const photoUrls = photos
      .filter(p => p.url) 

    res.json({ photos: photoUrls });
  } catch (err) {
    console.error("Error en getPhotosByCategory:", err);
    res.status(500).json({ msg: "Error obteniendo fotos", error: err.message });
  }
};
