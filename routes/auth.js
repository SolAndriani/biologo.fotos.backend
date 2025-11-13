import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: "Usuario ya existe" });

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ user: { username: newUser.username, id: newUser._id } });
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json({ msg: "Error en el servidor" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ msg: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Contraseña incorrecta" });
  
    res.json({ user: { username: user.username, id: user._id } });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ msg: "Error en el servidor" });
  }
});

export default router;
