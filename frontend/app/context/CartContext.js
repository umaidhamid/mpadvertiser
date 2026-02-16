"use client";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [coupon, setCoupon] = useState(null);

    /* ---------------- LOAD CART FROM LOCAL STORAGE ---------------- */
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");

        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (error) {
                console.error("Invalid cart data");
                setCart([]);
            }
        }
    }, []);

    /* ---------------- SAVE CART TO LOCAL STORAGE ---------------- */
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    /* ---------------- SYNC CART BETWEEN TABS ---------------- */
    useEffect(() => {
        const handleStorage = () => {
            const storedCart = localStorage.getItem("cart");
            setCart(storedCart ? JSON.parse(storedCart) : []);
        };

        window.addEventListener("storage", handleStorage);

        return () => {
            window.removeEventListener("storage", handleStorage);
        };
    }, []);

    /* ---------------- ADD TO CART ---------------- */
    const addToCart = (product, variant) => {
        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex(
                (item) =>
                    item._id === product._id &&
                    item.variant === variant.label
            );

            if (existingIndex !== -1) {
                const updatedCart = [...prevCart];

                updatedCart[existingIndex] = {
                    ...updatedCart[existingIndex],
                    quantity: updatedCart[existingIndex].quantity + 1,
                };

                return updatedCart;
            }

            return [
                ...prevCart,
                {
                    _id: product._id,
                    name: product.name,
                    price: variant.price,
                    variant: variant.label,
                    quantity: 1,
                },
            ];
        });
    };

    /* ---------------- UPDATE QUANTITY ---------------- */
    const updateQuantity = (id, variant, amount) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === id && item.variant === variant
                    ? {
                        ...item,
                        quantity: Math.max(1, item.quantity + amount),
                    }
                    : item
            )
        );
    };

    /* ---------------- REMOVE ITEM ---------------- */
    const removeItem = (id, variant) => {
        setCart((prevCart) =>
            prevCart.filter(
                (item) =>
                    !(item._id === id && item.variant === variant)
            )
        );
    };

    /* ---------------- CLEAR CART ---------------- */
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
        setCoupon(null);
    };

    /* ---------------- CALCULATIONS ---------------- */
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
                clearCart,
                subtotal,
                discount,
                total,
                coupon,
                setCoupon,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
