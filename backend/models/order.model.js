import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        customerName: String,
        phone: String,
        address: String,
        notes: String,

        items: [
            {
                productId: String,
                name: String,
                variant: String,
                price: Number,
                quantity: Number,
            },
        ],

        subtotal: Number,
        discount: Number,
        total: Number,
        invoiceNumber: {
            type: String,
            unique: true,
        },

        status: {
            type: String,
            default: "Pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
