import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imagePath: {
            type: String,
            required: true
        },
    }, 
    { timestamps: true } // createdAt, updatedAt
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;