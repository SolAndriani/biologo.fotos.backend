import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
   
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    res.json({ message: "Login exitoso", user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error("ERROR EN LOGIN:", err);
    res.status(500).json({ message: "Error en login", error: err.message });
  }
});

export default router;
