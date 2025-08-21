import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  ingredients: [String],
  benefits: { type: [String], default: [] }, // ✅ add this
  frequency: { type: String, default: "AM/PM" },
  dateStarted: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});



export default mongoose.model("Product", productSchema);
