"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../../context/CartContext";
import { Trash2, ShoppingBag, Loader2 } from "lucide-react";
import API from "../../lib/api";
import { toast } from "sonner";

export default function CartPage() {
    const router = useRouter();

    const {
        cart,
        updateQuantity,
        removeItem,
        subtotal,
        clearCart,
    } = useContext(CartContext);

    const [placingOrder, setPlacingOrder] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);

    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        address: "",
        notes: "",
    });

    const total = subtotal - discountAmount;

    /* ---------------- PHONE VALIDATION ---------------- */
    const isValidPhone = (phone) => {
        return /^[6-9]\d{9}$/.test(phone);
    };

    /* ---------------- APPLY COUPON ---------------- */
    const applyCoupon = async () => {
        if (!coupon.trim()) {
            toast.error("Enter coupon code");
            return;
        }

        try {
            const res = await API.post("/coupons/validate", {
                code: coupon.toUpperCase(),
                subtotal,
            });

            if (res.data.success) {
                setDiscountAmount(res.data.discount);
                toast.success("Coupon applied!");
            } else {
                setDiscountAmount(0);
                toast.error(res.data.message || "Invalid coupon");
            }

        } catch (error) {
            setDiscountAmount(0);
            toast.error("Coupon validation failed");
        }
    };

    /* ---------------- PLACE ORDER ---------------- */
    const handlePlaceOrder = async () => {
        if (!customer.name.trim() || !customer.phone.trim()) {
            toast.error("Name and phone are required");
            return;
        }

        if (!isValidPhone(customer.phone)) {
            toast.error("Enter valid 10 digit phone number");
            return;
        }

        if (cart.length === 0) {
            toast.error("Your cart is empty");
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
                discount: discountAmount,
                total,
            });

            const orderId = res.data.order._id;
            console.log(orderId)
            clearCart();

            toast.success("Order placed successfully!");

            // Open invoice page
            router.push(`/invoice/${orderId}`);

            // Auto download (if your invoice route handles ?download=true)
            window.open(`/invoice/${orderId}?download=true`, "_blank");

        } catch (error) {
            toast.error("Failed to place order. Try again.");
        } finally {
            setPlacingOrder(false);
        }
    };

    /* ---------------- EMPTY CART ---------------- */
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
                            className="bg-white/[0.04] border border-white/10 rounded-2xl p-6"
                        >
                            <div className="flex justify-between items-start">

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

                                <button
                                    onClick={() =>
                                        removeItem(item._id, item.variant)
                                    }
                                    className="text-red-500 hover:text-red-400 transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="flex justify-between items-center mt-6">

                                <div className="flex border border-white/20 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() =>
                                            updateQuantity(item._id, item.variant, -1)
                                        }
                                        className="px-5 py-2 hover:bg-white/10"
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
                                        className="px-5 py-2 hover:bg-white/10"
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
                <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-8 sticky top-28 h-fit">

                    <h2 className="text-2xl font-semibold mb-8">
                        Order Summary
                    </h2>

                    <div className="space-y-4 text-sm mb-8">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>

                        {discountAmount > 0 && (
                            <div className="flex justify-between text-green-400">
                                <span>Discount</span>
                                <span>- ₹{discountAmount.toFixed(0)}</span>
                            </div>
                        )}

                        <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>₹{total.toFixed(0)}</span>
                        </div>
                    </div>

                    {/* Coupon */}
                    <div className="flex gap-2 mb-8">
                        <input
                            placeholder="Coupon Code"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            className="flex-1 bg-white/10 p-3 rounded-xl outline-none"
                        />
                        <button
                            onClick={applyCoupon}
                            className="px-4 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition"
                        >
                            Apply
                        </button>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-5">

                        <input
                            placeholder="Full Name"
                            value={customer.name}
                            onChange={(e) =>
                                setCustomer({ ...customer, name: e.target.value })
                            }
                            className="w-full bg-white/10 p-3 rounded-xl outline-none"
                        />

                        <input
                            placeholder="Phone Number"
                            value={customer.phone}
                            onChange={(e) =>
                                setCustomer({ ...customer, phone: e.target.value })
                            }
                            className="w-full bg-white/10 p-3 rounded-xl outline-none"
                        />

                        <textarea
                            placeholder="Address"
                            value={customer.address}
                            onChange={(e) =>
                                setCustomer({ ...customer, address: e.target.value })
                            }
                            className="w-full bg-white/10 p-3 rounded-xl outline-none"
                        />

                        <textarea
                            placeholder="Order Notes (Optional)"
                            value={customer.notes}
                            onChange={(e) =>
                                setCustomer({ ...customer, notes: e.target.value })
                            }
                            className="w-full bg-white/10 p-3 rounded-xl outline-none"
                        />

                        <button
                            onClick={handlePlaceOrder}
                            disabled={placingOrder}
                            className="w-full bg-green-600 hover:bg-green-700 transition py-4 rounded-xl font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {placingOrder && (
                                <Loader2 className="animate-spin" size={18} />
                            )}
                            {placingOrder ? "Placing Order..." : "Place Order"}
                        </button>

                    </div>

                </div>

            </div>
        </section>
    );
}
