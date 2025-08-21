import fs from "fs";
import path from "path";

const __dirname = path.resolve(); // Current folder

const raw = fs.readFileSync(path.join(__dirname, "benefits.json"), "utf-8");

export const ingredientBenefits = JSON.parse(raw);
