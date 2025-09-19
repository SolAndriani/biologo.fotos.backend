import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  imageUrl: String,
  category: String,
  public_id: String,
  createdAt: { type: Date, default: Date.now }
});

const Photo = mongoose.model("Photo", photoSchema);
export default Photo;
