import express from "express";
import Item from "../models/item.js";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all items with filters
router.get("/", async (req, res) => {
  try {
    let query = {};

    if (req.query.category && req.query.category !== "All") {
      query.category = req.query.category;
    }
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseInt(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseInt(req.query.maxPrice);
    }
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }

    const items = await Item.find(query);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Item.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get single item
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});




// ✅ Admin: Add new item
router.post("/add", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: "Name, price, and category are required" });
    }

    const item = await Item.create({ name, price, category, description, image });
    res.status(201).json({ message: "Item added successfully", item });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
