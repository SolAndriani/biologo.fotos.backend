import express from "express";
import upload from "../middleware/multer.js";
import Photo from "../models/Photo.js";

const router = express.Router();

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { category } = req.body;
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const newPhoto = await Photo.create({
      url: req.file.path,
      public_id: req.file.filename,
      category,
    });

    res.status(201).json(newPhoto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error uploading photo" });
  }
});


router.get("/", async (req, res) => {
  try {
    const { category } = req.query; 
    const photos = category
      ? await Photo.find({ category })
      : await Photo.find();
    res.json(photos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching photos" });
  }
});

export default router;
