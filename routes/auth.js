import express from "express";
import User from "../models/User.js"; // subir un nivel desde routes/
import bcrypt from "bcrypt";

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    // Comparar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    // Responder con info del usuario
    res.json({ 
      message: "Login exitoso", 
      user: { id: user._id, username: user.username } 
    });
  } catch (err) {
    console.error("ERROR EN LOGIN:", err);
    res.status(500).json({ message: "Error en login", error: err.message });
  }
});

export default router;
