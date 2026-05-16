import express from 'express';
import Menu from '../models/Menu.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.json(menuItems);
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;