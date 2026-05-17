import mongoose from "mongoose";

// 1. The snapshot of the item purchased
const orderItemSchema = new mongoose.Schema(
    {
        menuId: { 
            type: Number, 
            required: true 
        },
        quantity: { 
            type: Number, 
            required: true 
        },
        price: { 
            type: Number, 
            required: true 
        }
    },
    { _id: false } // Clean up JSON: we don't need unique IDs for items inside a receipt
);

// 2. The main Order receipt
const orderSchema = new mongoose.Schema(
    {
        items: [orderItemSchema],
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["Pending", "Preparing", "Completed", "Cancelled"],
            default: "Pending"
        }
    }, 
    { timestamps: true } // Automatically creates 'createdAt' (Order Date)
);

const Order = mongoose.model("Order", orderSchema);

export default Order;