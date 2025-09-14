import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ====================
// Registro de usuario (texto plano)
// ====================
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: "Usuario ya existe" });

    const newUser = new User({ username, password });
    await newUser.save();

    console.log("Usuario registrado:", newUser);
    res.json({ user: newUser });
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json({ msg: "Error en el servidor" });
  }
});

// ====================
// Login de usuario
// ====================
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("BODY LOGIN:", req.body);

    const user = await User.findOne({ username });
    console.log("USUARIO ENCONTRADO:", user);

    if (!user) return res.status(401).json({ msg: "Usuario no encontrado" });

    if (user.password !== password) {
      console.log("Contraseña enviada:", password);
      console.log("Contraseña en DB:", user.password);
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    console.log("Login exitoso:", user);
    res.json({ user });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ msg: "Error en el servidor" });
  }
});

export default router;
