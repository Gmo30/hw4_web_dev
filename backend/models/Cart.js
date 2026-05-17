import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    menuId: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity cannot be less than 1"],
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false
    }
);

cartItemSchema.virtual("menuItemDetails", {
    ref: "Menu",
    localField: "menuId",   
    foreignField: "id",    
    justOne: true           
});

const cartSchema = new mongoose.Schema(
    {
        items: [cartItemSchema],
        totalPrice: {
            type: Number,
            required: true,
            default: 0
        }
    }, 
    { timestamps: true }
);

cartSchema.pre("save", async function () {
    this.totalPrice = this.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;