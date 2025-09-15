import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear collections
    await Product.deleteMany({});
    await User.deleteMany({});

    // Create Admin user
    await User.create({
      name: "Admin",
      email: "admin@buyhatke.com",
      password: "admin123",
      role: "admin",
    });

    console.log("✅ Seed complete: Admin user created, no products added.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
