import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; // asegúrate que la ruta coincida

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function createUser() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a MongoDB");

    const username = "Agustin";
    const plainPassword = "123456";

    // Generar hash de la contraseña
    const passwordHash = await bcrypt.hash(plainPassword, 10);

    // Crear usuario
    const user = new User({ username, passwordHash });
    await user.save();

    console.log("Usuario creado correctamente:", username);
    mongoose.disconnect();
  } catch (err) {
    console.error("Error creando usuario:", err);
    mongoose.disconnect();
  }
}

createUser();
