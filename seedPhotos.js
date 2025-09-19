import mongoose from "mongoose";
import dotenv from "dotenv";
import Photo from "./models/Photo.js";

dotenv.config();

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB ✅"))
  .catch((err) => console.error(err));

// Array de fotos por categoría
const photos = [
  // ===== Foto de perfil de Agustín =====
  { category: "perfil", url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028577/Agus_u9ctxp.jpg" },

  // ===== Fotos del header / carrusel =====
  { category: "header", url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028551/vuelo_gmgrl0.jpg" },
  { category: "header", url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028549/Vaca_vdfrna.jpg" },
  { category: "header", url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028547/Tero_p4xjxm.jpg" },
  { category: "header", url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028545/pinguino_fns6z8.jpg" },
  { category: "header", url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028543/pavo_a8trkr.jpg" },
  { category: "header", url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028541/paisaje_ewt9hm.jpg" },
  { category: "header", url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028539/Aguila_uief89.jpg" },

  // ===== Animales =====
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027815/animal23_fuzmxq.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027815/animal24_bgj5zh.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027815/animal19_bonzoj.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027814/animal22_pigev1.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027814/animal21_km464x.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027814/animal18_ehxmsn.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027813/animal20_aheiid.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027812/animal17_nffeix.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027812/animal16_pfiyww.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027810/animal13_t7pgfg.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027809/animal14_eknrwh.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027809/animal10_xbsp5x.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027809/animal15_ljuyap.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027808/animal12_fixlms.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027808/animal11_d3p4yg.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027808/animal9_q1ndep.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal8_opyvlv.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal5_pthjwj.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal3_q1pmqj.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal7_jnhtrk.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal6_nqavt9.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027807/animal4_ets0mo.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027806/animal1_ogysuy.jpg", category: "animales" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758027806/animal2_tzvud1.jpg", category: "animales" },

  // ===== Blanco y Negro =====
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028536/foto27_ifaycj.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028483/foto1_sqegkd.jpg", category: "blackandwhite" }, // resumido por ejemplo

  // ===== Paisajes =====
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028410/paisaje13_jcsjcv.jpg", category: "paisajes" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028389/paisaje1_xud8rb.jpg", category: "paisajes" },
];

// Función para insertar las fotos en Mongo
async function seedPhotos() {
  try {
    await Photo.deleteMany({});
    await Photo.insertMany(photos);
    console.log(`¡Todas las fotos se guardaron ✅! Total: ${photos.length}`);
  } catch (err) {
    console.error("Error al insertar fotos:", err);
  } finally {
    mongoose.disconnect();
  }
}

seedPhotos();
