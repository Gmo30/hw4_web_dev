import express from "express";
import Cart from "../models/Cart.js";
import Menu from "../models/Menu.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let cart = await Cart.findOne().populate("items.menuItemDetails");
        
        if (!cart) {
            return res.status(200).json({ items: [], totalPrice: 0 });
        }
        
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
});

router.post("/add", async (req, res) => {
    const { menuId, quantity } = req.body;

    try {
        const menuItem = await Menu.findOne({ id: menuId });
        
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        let cart = await Cart.findOne();

        if (!cart) {
            cart = new Cart({
                items: [{ 
                    menuId: menuId,
                    quantity: quantity || 1, 
                    price: menuItem.price 
                }]
            });
            await cart.save();
            // Populate before returning the newly created cart!
            await cart.populate("items.menuItemDetails");
            return res.status(201).json(cart);
        }

        const existingItemIndex = cart.items.findIndex(
            (item) => item.menuId === menuId 
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += (quantity || 1);
        } else {
            cart.items.push({ 
                menuId: menuId,
                quantity: quantity || 1, 
                price: menuItem.price 
            });
        }

        await cart.save();
        // Populate before returning the updated cart!
        await cart.populate("items.menuItemDetails");
        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
});

router.delete("/remove/:menuId", async (req, res) => {
    try {
        let cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            (item) => item.menuId !== parseInt(req.params.menuId)
        );

        await cart.save();
        // Populate before returning the updated cart!
        await cart.populate("items.menuItemDetails");
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error removing item", error: error.message });
    }
});

router.delete("/clear", async (req, res) => {
    try {
        let cart = await Cart.findOne();
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        // No need to populate an empty cart, but we keep the structure safe
        res.status(200).json({ message: "Cart cleared successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Error clearing cart", error: error.message });
    }
});

router.put("/decrease", async (req, res) => {
    const { menuId } = req.body;

    try {
        let cart = await Cart.findOne();
        
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const existingItemIndex = cart.items.findIndex(
            (item) => item.menuId === menuId 
        );

        if (existingItemIndex > -1) {
            let item = cart.items[existingItemIndex];

            if (item.quantity > 1) {
                item.quantity -= 1;
            } 
            else {
                cart.items.splice(existingItemIndex, 1);
            }

            await cart.save();
            // Populate before returning the updated cart!
            await cart.populate("items.menuItemDetails");
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: "Item not found in cart" });
        }

    } catch (error) {
        res.status(500).json({ message: "Error decreasing quantity", error: error.message });
    }
});

export default router;