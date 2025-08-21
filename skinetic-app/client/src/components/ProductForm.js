import React, { useState } from "react";
import axios from "axios";
import "./productform.css";

const PRODUCTS = {
  cerave: [
    "Hydrating Facial Cleanser",
    "Foaming Facial Cleanser",
    "Moisturizing Cream",
    "Moisturizing Lotion",
    "Hydrating Cream-to-Foam Cleanser",
    "SA Smoothing Cleanser",
    "Renewing SA Cream",
    "Hydrating Mineral Sunscreen SPF 30",
    "Skin Renewing Night Cream",
    "Eye Repair Cream",
  ],
  ponds: [
    "Flawless Radiance Derma+ Hydrating Day Gel",
    "Flawless Radiance Derma+ Night Cream",
    "Perfect Colour Complex Beauty Cream (Normal to Oily Skin)",
    "Perfect Colour Complex Beauty Cream (Dry Skin)",
    "Pimple Clear Face Wash",
    "Age Miracle Wrinkle Corrector Night Cream",
    "Lasting Oil Control Vanishing Cream (Very Oily Skin)",
    "Flawless Radiance Micellar Water",
    "Perfect Colour Complex Anti Marks Toner",
    "Deep Clean Face Scrub",
  ],
  simple: [
    "Kind to Skin Micellar Cleansing Water",
    "Kind to Skin Facial Wash",
    "Replenishing Rich Moisturiser",
    "Hydrating Light Moisturiser",
    "Soothing Facial Toner",
    "Purifying Cleansing Lotion",
    "Moisturising Face Wash",
    "Hydrating Serum",
    "Gentle Exfoliating Wash",
    "Refreshing Facial Wipes",
  ],
  nivea: [
    "Gentle Facial Cleansing Wipes",
    "Soft Moisturising Cream",
    "Men Sensitive Face Wash",
    "MicellAIR Skin Breathe Micellar Water",
    "Q10 Anti-Wrinkle Day Cream",
    "Hydrating Day Cream",
    "Intensive Moisture Body Lotion",
    "Pure & Natural Facial Oil",
    "Refreshingly Clean Face Wash",
    "Anti-Age Firming Night Cream",
  ],
};

const ProductForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    name: "",
    brand: "cerave",
    skinType: "Normal",
    frequency: "AM/PM",
  });

  const [routine, setRoutine] = useState(null);
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRoutine(null);
    setBenefits([]);

    if (!form.name) {
      setError("Please select a product");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      if (!apiUrl) {
        throw new Error("Missing REACT_APP_API_URL environment variable.");
      }

      const res = await axios.post(
        `${apiUrl}/api/benefits`,
        {
          name: form.name,
          brand: form.brand,
          skinType: form.skinType.toLowerCase(),
        },
        { withCredentials: true }
      );

      const productInfo = res.data;
      if (!productInfo || !productInfo.benefits) {
        setError("Product not found in our database.");
        setLoading(false);
        return;
      }

      let fetchedBenefits = productInfo.benefits;
      if (!fetchedBenefits || fetchedBenefits.length === 0) {
        fetchedBenefits = ["No benefits found."];
      }

      const stepRoutine = [
        "Cleanse your face",
        `Apply ${form.name} (${form.brand})`,
        "Finish with moisturizer",
      ];
      if (form.frequency.includes("AM") && !stepRoutine.includes("Don't forget sunscreen!"))
        stepRoutine.push("Don't forget sunscreen!");

      setRoutine({
        product: form.name,
        brand: form.brand,
        frequency: form.frequency,
        startedOn: new Date().toLocaleDateString(),
        routineSteps: stepRoutine,
      });

      setBenefits(fetchedBenefits);
      onCreated();

      setForm({
        name: "",
        brand: "cerave",
        skinType: "Normal",
        frequency: "AM/PM",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to fetch product data. Is your backend running and CORS enabled?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Brand:</label>
        <select name="brand" value={form.brand} onChange={handleChange}>
          {Object.keys(PRODUCTS).map((b) => (
            <option key={b} value={b}>
              {b.charAt(0).toUpperCase() + b.slice(1)}
            </option>
          ))}
        </select>

        <label>Product:</label>
        <select name="name" value={form.name} onChange={handleChange}>
          <option value="">-- Select Product --</option>
          {PRODUCTS[form.brand].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <label>Skin Type:</label>
        <select name="skinType" value={form.skinType} onChange={handleChange}>
          <option value="Normal">Normal</option>
          <option value="Dry">Dry</option>
          <option value="Oily">Oily</option>
          <option value="Combination">Combination</option>
          <option value="Sensitive">Sensitive</option>
        </select>

        <label>Frequency:</label>
        <select name="frequency" value={form.frequency} onChange={handleChange}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
          <option value="AM/PM">AM/PM</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "SEARCH"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {routine && (
        <div className="routine-card">
          <h3>Routine Created:</h3>
          <p>
            Product: {routine.product} {routine.brand ? `(${routine.brand})` : ""}
          </p>
          <p>Frequency: {routine.frequency}</p>
          <p>Started On: {routine.startedOn}</p>

          {routine.routineSteps?.length > 0 && (
            <>
              <h4>Step-by-Step Routine:</h4>
              <ol>
                {routine.routineSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </>
          )}

          <h4>Benefits for {form.skinType} skin:</h4>
          {benefits.map((b, idx) => (
            <div key={idx} className="benefit-item">
              <p>- {b}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductForm;
