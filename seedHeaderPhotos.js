import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Photo from './models/Photos.js';

dotenv.config();

const fotos = [
  // Animales
  { title: 'Aguila', imageUrl: '/uploads/Animales/aguila.jpg', category: 'animales', user: 'admin' },
  { title: 'Camaleón', imageUrl: '/uploads/Animales/camaleon.jpg', category: 'animales', user: 'admin' },
  { title: 'Pavo', imageUrl: '/uploads/Animales/pavo.jpg', category: 'animales', user: 'admin' },

  // Paisajes
  { title: 'Montaña', imageUrl: '/uploads/paisajes/montana.jpg', category: 'paisajes', user: 'admin' },
  { title: 'Río', imageUrl: '/uploads/paisajes/rio.jpg', category: 'paisajes', user: 'admin' },
  { title: 'Atardecer', imageUrl: '/uploads/paisajes/atardecer.jpg', category: 'paisajes', user: 'admin' },

  // Blanco y Negro
  { title: 'Ciudad', imageUrl: '/uploads/blackandwhite/ciudad.jpg', category: 'blanco-y-negro', user: 'admin' },
  { title: 'Bosque', imageUrl: '/uploads/blackandwhite/bosque.jpg', category: 'blanco-y-negro', user: 'admin' },
  { title: 'Puente', imageUrl: '/uploads/blackandwhite/puente.jpg', category: 'blanco-y-negro', user: 'admin' },
];

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    for (const foto of fotos) {
      await Photo.create(foto);
      console.log(`Foto creada: ${foto.title} (${foto.category})`);
    }

    console.log('✅ Todas las fotos iniciales fueron registradas en Mongo');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Desconectado de Mongo');
  }
}

main();
