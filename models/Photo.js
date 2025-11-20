import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    category: { type: String, required: true },
    url: { type: String, required: true }, // URL de Cloudinary
  },
  { timestamps: true }
);

const Photo = mongoose.model("Photo", PhotoSchema);
export default Photo;
