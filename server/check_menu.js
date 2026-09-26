import mongoose from 'mongoose';
import Menu from './models/menu.js';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/restaurant');
  const items = await Menu.find({}, 'name category image price');
  console.log(`Total items in local DB: ${items.length}`);
  items.forEach(i => {
    console.log(`[${i.category}] ${i.name} -> ${i.image}`);
  });
  await mongoose.connection.close();
}
check();
