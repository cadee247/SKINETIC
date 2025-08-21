import Product from "../models/Product.js";
import { getBenefits } from "./benefitController.js";

export const createProduct = async (req, res) => {
  try {
    const { name, brand, ingredients, frequency, skinType } = req.body;

    const product = new Product({
      name,
      brand,
      ingredients,
      frequency,
      dateStarted: new Date(),
    });

    await product.save();

    // Pull benefits from JSON
    const benefits = ingredients.flatMap((ing) => getBenefits(ing, skinType));

    res.json({
      message: "Routine Created",
      product: product.name,
      frequency: product.frequency,
      startedOn: product.dateStarted.toLocaleDateString("en-GB"),
      steps: [
        "Cleanse your face",
        `Apply ${product.name}`,
        "Finish with moisturizer",
        frequency.includes("AM") ? "Don't forget sunscreen!" : null,
      ].filter(Boolean),
      benefits: benefits.length > 0 ? benefits : ["No benefits found."],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
};
