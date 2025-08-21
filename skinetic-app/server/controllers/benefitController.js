import { ingredientBenefits } from "../benefits.js";
import { normalize } from "../utils/normalize.js";

export const getBenefits = (ingredient, skinType) => {
  const normalizedIngredient = normalize(ingredient);
  const normalizedSkinType = normalize(skinType);

  // Try to find best matching key in JSON
  const ingredientKey = Object.keys(ingredientBenefits.ingredients).find((key) => {
    const normKey = normalize(key);
    return (
      normKey === normalizedIngredient ||
      normalizedIngredient.includes(normKey) ||
      normKey.includes(normalizedIngredient)
    );
  });

  return ingredientKey && ingredientBenefits.ingredients[ingredientKey]
    ? ingredientBenefits.ingredients[ingredientKey][normalizedSkinType] || []
    : [];
};

// Controller for API route
export const fetchBenefits = (req, res) => {
  const { ingredient, skinType } = req.query;

  if (!ingredient || !skinType) {
    return res.status(400).json({ error: "ingredient and skinType required" });
  }

  const benefits = getBenefits(ingredient, skinType);
  res.json({ results: benefits });
};
