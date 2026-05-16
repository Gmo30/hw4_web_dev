import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Menu from '../models/Menu.js';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI

const menuData = [
  {
    id: 1,
    name: "Premium Jasmine Milk Tea",
    price: 6.99,
    description: "Freshly picked double-petal jasmine from Hengzhou is infused into high-mountain tea through a meticulous seven-step scenting process. Blended with premium milk, the result is a sweet, delicate, and refreshing taste with a long-lasting floral aroma.",
    imagePath: "jasmine_mt.png",
  },
  {
    id: 2,
    name: "White Champaca Milk Tea",
    price: 6.99,
    description: "Mengding high mountain tea from Ya'an, Sichuan, scented with fresh flowers — only the elegant aroma of orchids remains. Delicately fragrant with a lingering finish, blended with premium milk for a fresh, mellow, and silky-smooth taste.",
    imagePath: "champaca_mt.png",
  },
  {
    id: 3,
    name: "Osmanthus Milk Tea",
    price: 6.99,
    description: "High-mountain mist nurtures the tender Longjing — one bud, one leaf — gently blended with golden osmanthus. The tea exudes a bright, refined aroma while the sweet scent of osmanthus lingers.",
    imagePath: "osmanthus_mt.png",
  },
  {
    id: 4,
    name: "Jasmine Mango Smoothie",
    price: 7.99,
    description: "Jasmine-scented tea blended into a cool, creamy mango smoothie with fresh sweet mango, juicy grapefruit, and smooth coconut milk. Packed with abundant fruit pulp, every sip delivers a natural fruity texture.",
    imagePath: "mango.webp",
  },
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    await Menu.deleteMany({}); // Clear existing data
    await Menu.insertMany(menuData);
    console.log("Menu Database Seeded! 🌱");
    await mongoose.connection.close()
    process.exit();
  });