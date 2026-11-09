// Run using: npm run seed
// Seeds products, users, admin, and orders.
// Safe to rerun using stable keys.

require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Product = require("./model/Product");
const User = require("./model/User");
const Order = require("./model/Order");

// ===============================
// PRODUCTS
// ===============================

const products = [
  {
    name: "Everyday Canvas Backpack",
    description: "A durable everyday backpack with a padded laptop sleeve.",
    price: 2499,
    category: "Accessories",
    stock: 24,
    imagesUrl: "https://placehold.co/600x600?text=Canvas+Backpack",
    rating: 4.6,
    numReviews: 18,
  },
  {
    name: "Wireless Bluetooth Headphones",
    description: "Comfortable over-ear headphones with clear wireless audio.",
    price: 3999,
    category: "Electronics",
    stock: 16,
    imagesUrl: "https://placehold.co/600x600?text=Headphones",
    rating: 4.4,
    numReviews: 27,
  },
  {
    name: "Ceramic Coffee Mug Set",
    description: "A set of two glazed ceramic mugs for your daily coffee.",
    price: 899,
    category: "Home",
    stock: 40,
    imagesUrl: "https://placehold.co/600x600?text=Coffee+Mugs",
    rating: 4.8,
    numReviews: 12,
  },
  {
    name: "Classic Cotton T-Shirt",
    description: "A soft, breathable cotton t-shirt for everyday wear.",
    price: 799,
    category: "Clothing",
    stock: 32,
    imagesUrl: "https://placehold.co/600x600?text=Cotton+T-Shirt",
    rating: 4.2,
    numReviews: 9,
  },
];

// ===============================
// USERS
// ===============================

const demoUsers = [
  {
    name: "ShopNest Admin",
    email: "admin@shopnest.demo",
    role: "admin",
  },
  {
    name: "Aarav Sharma",
    email: "aarav@shopnest.demo",
    role: "user",
  },
  {
    name: "Maya Patel",
    email: "maya@shopnest.demo",
    role: "user",
  },
];

// Common demo password
const DEMO_PASSWORD = "ShopNestDemo123!";

// ===============================
// SEED FUNCTION
// ===============================

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in backend/.env");
    }

    // Connect MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

    // ===============================
    // SEED PRODUCTS
    // ===============================

    const savedProducts = {};

    for (const product of products) {
      savedProducts[product.name] = await Product.findOneAndUpdate(
        { name: product.name },
        { $set: product },
        {
          returnDocument: "after",
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      );
    }

    console.log("Products seeded successfully");

    // ===============================
    // SEED USERS
    // ===============================

    const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

    const savedUsers = {};

    for (const user of demoUsers) {
      savedUsers[user.email] = await User.findOneAndUpdate(
        { email: user.email },
        {
          $set: {
            ...user,
            password: hashedPassword,
            verified: true,
          },
          $unset: {
            otp: 1,
          },
        },
        {
          returnDocument: "after",
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      );
    }

    console.log("Users and Admin seeded successfully");

    // ===============================
    // SEED ORDERS
    // ===============================

    const orderSeeds = [
      {
        paymentId: "seed-order-001",

        user: savedUsers["aarav@shopnest.demo"]._id,

        products: [
          {
            product: savedProducts["Everyday Canvas Backpack"]._id,
            quantity: 1,
          },
          {
            product: savedProducts["Ceramic Coffee Mug Set"]._id,
            quantity: 2,
          },
        ],

        totalAmount: 4297,

        address: {
          fullName: "Aarav Sharma",
          street: "12 Park Street",
          city: "Pune",
          postalCode: "411001",
          country: "India",
        },

        status: "delivered",
      },

      {
        paymentId: "seed-order-002",

        user: savedUsers["maya@shopnest.demo"]._id,

        products: [
          {
            product: savedProducts["Wireless Bluetooth Headphones"]._id,
            quantity: 1,
          },
          {
            product: savedProducts["Classic Cotton T-Shirt"]._id,
            quantity: 1,
          },
        ],

        totalAmount: 4798,

        address: {
          fullName: "Maya Patel",
          street: "8 Lake Road",
          city: "Mumbai",
          postalCode: "400001",
          country: "India",
        },

        status: "shipped",
      },

      {
        paymentId: "seed-order-003",

        user: savedUsers["aarav@shopnest.demo"]._id,

        products: [
          {
            product: savedProducts["Classic Cotton T-Shirt"]._id,
            quantity: 2,
          },
        ],

        totalAmount: 1598,

        address: {
          fullName: "Aarav Sharma",
          street: "12 Park Street",
          city: "Pune",
          postalCode: "411001",
          country: "India",
        },

        status: "pending",
      },
    ];

    for (const order of orderSeeds) {
      await Order.findOneAndUpdate(
        { paymentId: order.paymentId },
        { $set: order },
        {
          returnDocument: "after",
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      );
    }

    console.log("Orders seeded successfully");

    // ===============================
    // FINAL SUMMARY
    // ===============================

    console.log("\n================================");
    console.log("       SHOPNEST SEED COMPLETE");
    console.log("================================");

    console.log(`Products: ${products.length}`);
    console.log(`Users: ${demoUsers.length}`);
    console.log(`Orders: ${orderSeeds.length}`);

    console.log("\nDEMO LOGIN CREDENTIALS");

    console.log("\nADMIN");
    console.log("Email: admin@shopnest.demo");
    console.log(`Password: ${DEMO_PASSWORD}`);

    console.log("\nCUSTOMER 1");
    console.log("Email: aarav@shopnest.demo");
    console.log(`Password: ${DEMO_PASSWORD}`);

    console.log("\nCUSTOMER 2");
    console.log("Email: maya@shopnest.demo");
    console.log(`Password: ${DEMO_PASSWORD}`);

    console.log("================================\n");
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
