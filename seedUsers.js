import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';

dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Conectado a MongoDB');

  const existingUser = await User.findOne({ username: 'Agustin' });
  if (existingUser) {
    console.log('Usuario ya existe');
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash('123456', 10);

  const user = new User({
    username: 'Agustin',
    password: passwordHash
  });

  await user.save();
  console.log('Usuario creado:', user.username);

  await mongoose.disconnect();
}

main();
