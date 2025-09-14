import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import photoRoutes from "./routes/photoRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS
app.use(cors({
  origin: [
    "https://biologo-frontend-git-main-sol-andriani.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true
}));

// Middlewares
app.use(express.json());

// Carpeta uploads accesible públicamente
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/photos", photoRoutes);

app.get("/", (req, res) => res.send("Backend funcionando correctamente ✅"));

// Conexión a Mongo
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Conectado a MongoDB ✅"))
.catch(err => console.error("Error conectando a MongoDB:", err));

// Levantar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
