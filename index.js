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

// CORS para producción y desarrollo
app.use(cors({
  origin: [
    "https://biologo-16li7z0xa-sol-andriani.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true
}));

app.use(express.json());

// Servir imágenes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas API
app.use("/api/photos", photoRoutes);
app.use("/api/auth", authRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error conectando a MongoDB:", err));

// Servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
