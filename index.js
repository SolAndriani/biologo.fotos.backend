import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import photoRoutes from "./routes/photoRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());


app.use("/api/photos", photoRoutes);

app.get("/", (req, res) => res.send("Backend funcionando ✅"));


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conectado a MongoDB ✅"))
.catch(err => console.error("Error conectando a MongoDB:", err));

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
