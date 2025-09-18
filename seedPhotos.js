// seedPhotos.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Photo from "./models/Photo.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB ✅"))
  .catch((err) => console.error(err));

// Array de fotos por categoría
const photos = [
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
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028534/foto26_enufdk.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028532/foto25_hyzkwd.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028530/foto24_fzmt6v.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028529/foto23_tzfdfz.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028528/foto22_an5b6n.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028524/foto21_fg1wzx.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028523/foto20_yrry4s.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028520/foto19_lspetc.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028520/foto18_ebds15.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028518/foto17_xxds1o.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028515/foto16_gtkoaa.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028512/foto15_m72zyw.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028509/foto14_jgb7kt.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028507/foto13_jfd2ba.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028505/foto12_e4pyop.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028499/foto9_bgb6ka.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028497/foto8_wu5dzp.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028495/foto7_eixfhy.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028493/foto6_a4uyda.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028491/foto5_ss9sop.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028490/foto4_wjamwl.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028487/foto3_nfosqn.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028485/foto2_lfjygs.jpg", category: "blackandwhite" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028483/foto1_sqegkd.jpg", category: "blackandwhite" },

  // ===== Paisajes =====
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028410/paisaje13_jcsjcv.jpg", category: "paisajes" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028408/paisaje12_rmctpr.jpg", category: "paisajes" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028406/paisaje11_u4bsqx.jpg", category: "paisajes" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028405/paisaje10_mz0t35.jpg", category: "paisajes" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028402/paisaje9_lt3aih.jpg", category: "paisajes" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028400/paisaje8_tgqdvx.jpg", category: "paisajes" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028398/paisaje7_c7hbne.jpg", category: "paisajes" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028396/paisaje6_wixzom.jpg", category: "paisajes" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028394/paisaje5_oyvrax.jpg", category: "paisajes" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028394/paisaje4_migxkv.jpg", category: "paisajes" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028391/paisaje3_fxxpxw.jpg", category: "paisajes" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028391/paisaje2_darvil.jpg", category: "paisajes" },
  { url: "https://res.cloudinary.com/dmixd7wpb/image/upload/v1758028389/paisaje1_xud8rb.jpg", category: "paisajes" },
];

// Agregar public_id a cada foto
const photosWithId = photos.map(p => ({
  ...p,
  public_id: p.url.split("/upload/")[1].replace(/\.[a-z]+$/, "")
}));

// Insertar en MongoDB
async function seedPhotos() {
  try {
    await Photo.insertMany(photosWithId);
    console.log(`¡Todas las fotos se guardaron ✅! Total: ${photosWithId.length}`);
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

seedPhotos();
