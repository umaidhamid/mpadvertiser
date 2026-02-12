"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductCard({ product }) {
    const {
        _id,
        imageUrl,
        name,
        price,
        discount,
        finalprice,
        unit,
    } = product;

    const hasDiscount = discount > 0;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white/[0.03] 
      border border-white/10 rounded-3xl overflow-hidden 
      backdrop-blur-xl transition-all duration-500
      hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
        >
            {/* Subtle Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 blur-2xl" />

            {/* Image */}
            <div className="relative h-72 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover 
          transition-transform duration-700 group-hover:scale-105"
                />

                {hasDiscount && (
                    <div className="absolute top-4 left-4 
          bg-black/70 backdrop-blur-md 
          text-white text-xs font-medium 
          px-3 py-1 rounded-full border border-white/20">
                        {discount}% OFF
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="relative p-6">

                {/* Product Name */}
                <h3 className="text-lg font-semibold tracking-wide 
        text-white group-hover:text-indigo-400 transition">
                    {name}
                </h3>

                {/* Price */}
                <div className="flex items-end gap-3 mt-4">
                    {hasDiscount ? (
                        <>
                            <span className="text-2xl font-bold text-white">
                                ₹{finalprice}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                                ₹{price}
                            </span>
                        </>
                    ) : (
                        <span className="text-2xl font-bold text-white">
                            ₹{price}
                        </span>
                    )}

                    <span className="text-sm text-gray-400 pb-1">
                        / {unit}
                    </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 my-6" />

                {/* Button */}
                <Link
                    href={`/products/${_id}`}
                    className="block w-full text-center py-3 rounded-xl 
          bg-white text-black font-medium tracking-wide
          transition duration-300 
          hover:bg-indigo-600 hover:text-white"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
}