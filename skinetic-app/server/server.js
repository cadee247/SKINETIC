import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Routes
import productRoutes from "./routes/products.js";

import benefitsRoutes from "./routes/benefits.js";     // ✅ new benefits route

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

/*
// Redis temporarily disabled
import { createClient } from "redis";
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.on("error", (err) => console.error("Redis Error:", err));
await redisClient.connect();
app.set("redis", redisClient);
*/

// Routes
app.use("/api/products", productRoutes);
app.use("/api/benefits", benefitsRoutes);

// Test route
app.get("/", (req, res) => res.send("Skinetic API is running 🚀"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
