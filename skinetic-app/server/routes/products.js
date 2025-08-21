import express from "express";
import Product from "../models/Product.js";
import { ingredientBenefits } from "../benefits.js"; // your JSON file

const router = express.Router();

// Helper to normalize keys
const normalize = (str = "") => str.trim().toLowerCase();

// Helper to clean product name (removes parentheses like "(Oxy)")
const cleanName = (str = "") => str.replace(/\(.*\)/, "").trim();

// GET all products
router.get("/", async (req, res) => {
  console.log("📥 GET /api/products called");
  try {
    const products = await Product.find();
    console.log("📤 Sending products:", products);
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST new product + calculate benefits
router.post("/", async (req, res) => {
  console.log("📥 POST /api/products called with body:", req.body);
  try {
    const { name, brand, frequency, skinType } = req.body;

    if (!name || !frequency || !skinType) {
      return res.status(400).json({
        error: "Please provide product name, frequency, and skin type",
      });
    }

    const product = new Product({
      name,
      brand,
      frequency,
      dateStarted: new Date(),
    });

    await product.save();
    console.log("✅ New product saved:", product);

    // Normalize keys
    const skinKey = normalize(skinType);
    const productKey = normalize(cleanName(name));
    const brandKey = normalize(brand);

    let benefits = [];

    // 1️⃣ Check brand-specific products (with cleaned name)
    const brandProducts = ingredientBenefits[brandKey] || {};
    const brandKeysNormalized = Object.keys(brandProducts).reduce((acc, key) => {
      acc[normalize(key)] = brandProducts[key];
      return acc;
    }, {});

    if (brandKeysNormalized[productKey]) {
      benefits = brandKeysNormalized[productKey].benefits[skinKey] || [];
    }

    // 2️⃣ Fallback to generic ingredient benefits
    if (!benefits.length && ingredientBenefits.ingredients?.[productKey]) {
      benefits = ingredientBenefits.ingredients[productKey][skinKey] || [];
    }

    if (!benefits.length) benefits = ["No benefits found."];

    // Build routine steps
    const routineSteps = [
      "Cleanse your face",
      `Apply ${product.name}`,
      "Finish with moisturizer",
    ];
    if (frequency.includes("AM")) routineSteps.push("Don’t forget sunscreen!");

    res.status(201).json({
      message: "Routine Created",
      product: product.name,
      brand: product.brand,
      frequency: product.frequency,
      startedOn: product.dateStarted.toLocaleDateString("en-GB"),
      routineSteps,
      benefits,
    });
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(400).json({ error: "Failed to add product" });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
