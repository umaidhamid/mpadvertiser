"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../../context/CartContext";
import { Trash2, ShoppingBag } from "lucide-react";
import API from "../../lib/api";

export default function CartPage() {
    const router = useRouter();

    const { cart, updateQuantity, removeItem, subtotal } =
        useContext(CartContext);

    const [placingOrder, setPlacingOrder] = useState(false);

    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        address: "",
        notes: "",
    });

    const total = subtotal;

    const handlePlaceOrder = async () => {
        if (!customer.name || !customer.phone) {
            alert("Name and phone are required");
            return;
        }

        try {
            setPlacingOrder(true);

            const res = await API.post("/orders/create", {
                customerName: customer.name,
                phone: customer.phone,
                address: customer.address,
                notes: customer.notes,
                items: cart,
                subtotal,
                discount: 0,
                total,
            });

            localStorage.removeItem("cart");

            router.push(`/invoice/${res.data.order._id}`);
        } catch (error) {
            alert("Failed to place order");
        } finally {
            setPlacingOrder(false);
        }
    };

    if (cart.length === 0) {
        return (
            <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center">
                <ShoppingBag size={48} className="mb-6 text-white/30" />
                <h2 className="text-3xl font-semibold mb-3">
                    Your Cart is Empty
                </h2>
                <p className="text-gray-400">
                    Add products to start building your order.
                </p>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-black text-white py-24 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-14">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-8">

                    <h1 className="text-3xl font-bold tracking-tight">
                        Shopping Cart
                    </h1>

                    {cart.map((item) => (
                        <div
                            key={item._id + item.variant}
                            className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition hover:border-indigo-500/40"
                        >
                            <div className="flex justify-between items-start">

                                {/* Product Info */}
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Variant: {item.variant}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        ₹{item.price} per unit
                                    </p>
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() =>
                                        removeItem(item._id, item.variant)
                                    }
                                    className="text-red-500 hover:text-red-400 transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {/* Quantity + Total */}
                            <div className="flex justify-between items-center mt-6">

                                <div className="flex border border-white/20 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() =>
                                            updateQuantity(item._id, item.variant, -1)
                                        }
                                        className="px-5 py-2 hover:bg-white/10 transition"
                                    >
                                        −
                                    </button>

                                    <span className="px-6 flex items-center font-medium">
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            updateQuantity(item._id, item.variant, 1)
                                        }
                                        className="px-5 py-2 hover:bg-white/10 transition"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="text-lg font-semibold">
                                    ₹{item.price * item.quantity}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RIGHT SIDE */}
                <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-8 sticky top-28 h-fit">

                    <h2 className="text-2xl font-semibold mb-8">
                        Order Summary
                    </h2>

                    <div className="space-y-4 text-sm mb-8">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                    {/* Customer Form */}
                    <div className="space-y-5">
                        <h3 className="text-lg font-semibold">
                            Customer Information
                        </h3>

                        <input
                            placeholder="Full Name"
                            value={customer.name}
                            onChange={(e) =>
                                setCustomer({
                                    ...customer,
                                    name: e.target.value,
                                })
                            }
                            className="w-full bg-white/10 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <input
                            placeholder="Phone Number"
                            value={customer.phone}
                            onChange={(e) =>
                                setCustomer({
                                    ...customer,
                                    phone: e.target.value,
                                })
                            }
                            className="w-full bg-white/10 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <textarea
                            placeholder="Address"
                            value={customer.address}
                            onChange={(e) =>
                                setCustomer({
                                    ...customer,
                                    address: e.target.value,
                                })
                            }
                            className="w-full bg-white/10 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <textarea
                            placeholder="Order Notes (Optional)"
                            value={customer.notes}
                            onChange={(e) =>
                                setCustomer({
                                    ...customer,
                                    notes: e.target.value,
                                })
                            }
                            className="w-full bg-white/10 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <button
                            onClick={handlePlaceOrder}
                            disabled={placingOrder}
                            className="w-full bg-green-600 hover:bg-green-700 transition py-4 rounded-xl font-semibold text-white disabled:opacity-50"
                        >
                            {placingOrder
                                ? "Placing Order..."
                                : "Place Order"}
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
