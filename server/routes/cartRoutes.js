import express from "express";
import Cart from "../models/cart.js";
import Item from "../models/item.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get cart
router.get("/", authenticateToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate("items.item");
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add to cart
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });

    const existing = cart.items.find(i => i.item.toString() === itemId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ item: itemId, quantity });
    }

    await cart.save();
    res.json({ message: "Item added", cart });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update cart item
router.put("/:itemId", authenticateToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const cartItem = cart.items.find(i => i.item.toString() === req.params.itemId);
    if (!cartItem) return res.status(404).json({ error: "Item not in cart" });

    if (quantity <= 0) {
      cart.items = cart.items.filter(i => i.item.toString() !== req.params.itemId);
    } else {
      cartItem.quantity = quantity;
    }

    await cart.save();
    res.json({ message: "Cart updated", cart });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Remove item
router.delete("/:itemId", authenticateToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(i => i.item.toString() !== req.params.itemId);
    await cart.save();

    res.json({ message: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
