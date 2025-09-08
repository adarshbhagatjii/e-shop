import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String },
}, { timestamps: true });

export default mongoose.model("Item", itemSchema);
