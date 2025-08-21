// routineGenerator.js
import productsData from './products.json';

function findProduct(productName) {
  const lowerName = productName.toLowerCase();

  for (const brand in productsData) {
    if (brand === "ingredients") continue;
    const products = productsData[brand];
    for (const name in products) {
      if (name.toLowerCase() === lowerName) {
        return { ...products[name], brand };
      }
    }
  }
  return null;
}

export function generateRoutineStep(productName, skinType) {
  const product = findProduct(productName);
  if (!product) return null;

  // Normalize skin type to lowercase
  const skinKey = Object.keys(product.benefits || {}).find(
    (k) => k.toLowerCase() === skinType.toLowerCase()
  );

  // Get benefits safely
  let benefits = skinKey ? product.benefits[skinKey] : null;

  // Ensure benefits is always an array
  if (!benefits || benefits === "none") {
    benefits = ["No benefits found"];
  } else if (typeof benefits === "string") {
    benefits = benefits.split(",").map((b) => b.trim());
  } else if (!Array.isArray(benefits)) {
    benefits = ["No benefits found"];
  }

  // Determine time (AM/PM) based on product name keywords
  const lowerName = productName.toLowerCase();
  const eveningKeywords = ["night", "retinol", "peel", "serum", "cream-to-foam"];
  const time = eveningKeywords.some((k) => lowerName.includes(k)) ? "PM" : "AM";

  // Build routine steps
  const steps = ["Cleanse your face", `Apply ${productName}`, "Finish with moisturizer"];
  if (time === "AM") steps.push("Don’t forget sunscreen!");

  return {
    product: `${productName} (${product.brand})`,
    frequency: time,
    startedOn: new Date().toLocaleDateString(),
    steps,
    benefits
  };
}
