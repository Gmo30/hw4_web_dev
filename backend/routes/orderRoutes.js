import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const router = express.Router();

router.post("/checkout", async (req, res) => {
    try {
        const cart = await Cart.findOne();

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cannot place an order with an empty cart." });
        }

        const newOrder = new Order({
            items: cart.items.map(item => ({
                menuId: item.menuId,
                quantity: item.quantity,
                price: item.price
            })),
            totalPrice: cart.totalPrice
        });

        await newOrder.save();

        cart.items = [];
        await cart.save();

        res.status(201).json({ 
            message: "Order placed successfully!", 
            order: newOrder 
        });

    } catch (error) {
        res.status(500).json({ message: "Error placing order", error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
});

router.get("/:orderId", async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order", error: error.message });
    }
});

export default router;