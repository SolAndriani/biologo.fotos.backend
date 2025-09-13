import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import photoRoutes from "./routes/photoRoutes.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
  origin: "https://biologo-16li7z0xa-sol-andriani.vercel.app"
}));

app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/photos", photoRoutes);
app.use("/api/auth", authRoutes);


app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error conectando a MongoDB:", err));

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
