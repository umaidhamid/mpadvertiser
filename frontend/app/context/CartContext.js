"use client";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [coupon, setCoupon] = useState(null);

    // Load cart
    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) setCart(JSON.parse(stored));
    }, []);

    // Save cart
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Sync across tabs
    useEffect(() => {
        const handleStorage = () => {
            const stored = localStorage.getItem("cart");
            setCart(stored ? JSON.parse(stored) : []);
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const addToCart = (product, variant) => {
        const existing = cart.find(
            (item) =>
                item._id === product._id &&
                item.variant === variant.label
        );

        if (existing) {
            existing.quantity += 1;
            setCart([...cart]);
        } else {
            setCart([
                ...cart,
                {
                    _id: product._id,
                    name: product.name,
                    price: variant.price,
                    variant: variant.label,
                    quantity: 1,
                },
            ]);
        }
    };

    const updateQuantity = (id, variant, amount) => {
        const updated = cart.map((item) =>
            item._id === id && item.variant === variant
                ? {
                    ...item,
                    quantity: Math.max(1, item.quantity + amount),
                }
                : item
        );
        setCart(updated);
    };

    const removeItem = (id, variant) => {
        const updated = cart.filter(
            (item) =>
                !(item._id === id && item.variant === variant)
        );
        setCart(updated);
    };

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const discount =
        coupon === "MP10" ? subtotal * 0.1 : 0;

    const total = subtotal - discount;

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                updateQuantity,
                removeItem,
                subtotal,
                total,
                discount,
                setCoupon,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
