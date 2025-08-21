// routes/benefits.js
import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Load the JSON once
const benefitsPath = path.join(process.cwd(), "benefits.json");
const allBenefits = JSON.parse(fs.readFileSync(benefitsPath, "utf-8"));

// Helper to normalize strings
const normalize = (str = "") => str.trim().toLowerCase();

router.post("/", (req, res) => {
  const { name, brand, skinType } = req.body;

  if (!name || !skinType) {
    return res.status(400).json({ error: "Product name and skinType are required" });
  }

  const normalizedBrand = brand ? normalize(brand) : null;
  const normalizedName = normalize(name);
  const normalizedSkin = normalize(skinType);

  let productData;

  // Search by brand first if provided
  if (normalizedBrand && allBenefits[normalizedBrand]) {
    const brandProducts = allBenefits[normalizedBrand];
    productData = Object.entries(brandProducts).find(
      ([prodName]) => normalize(prodName) === normalizedName
    );
  }

  // If not found by brand, search all brands
  if (!productData) {
    for (const [brandKey, products] of Object.entries(allBenefits)) {
      if (brandKey === "ingredients") continue; // skip ingredients
      const found = Object.entries(products).find(
        ([prodName]) => normalize(prodName) === normalizedName
      );
      if (found) {
        productData = found;
        break;
      }
    }
  }

  if (!productData) {
    return res.status(404).json({ error: "Product not found" });
  }

  const [productName, productInfo] = productData;

  // Get benefits for the skin type
  let benefits = productInfo.benefits[normalizedSkin];
  if (!benefits || (Array.isArray(benefits) && benefits.length === 0)) {
    benefits = ["No benefits found."];
  } else if (typeof benefits === "string") {
    benefits = benefits.split(",").map((b) => b.trim());
  }

  // Basic routine
  const routineSteps = [
    "Cleanse your face",
    `Apply ${productName}${brand ? ` (${brand})` : ""}`,
    "Finish with moisturizer",
  ];
  if (normalizedSkin === "normal" || normalizedSkin === "dry" || normalizedSkin === "oily") {
    routineSteps.push("Don't forget sunscreen!");
  }

  res.json({
    product: productName,
    brand: brand || "",
    skinType,
    benefits,
    routineSteps,
    startedOn: new Date().toLocaleDateString(),
  });
});

export default router;
