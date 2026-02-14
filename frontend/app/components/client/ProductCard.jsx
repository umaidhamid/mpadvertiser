"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  const {
    _id,
    image,
    name,
    category,
    price,
    discount,
    finalprice,
    unit,
    rating = 4.5,
    reviews = 24,
    stock = 10,
    delivery = "2-3 Days",
  } = product;

  const hasDiscount = discount > 0;
  const savings = price - finalprice;

  return (
    <Link href={`/Products/${product.slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white/[0.03]
      border border-white/10 rounded-3xl overflow-hidden
      backdrop-blur-xl transition-all duration-500
      hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 blur-2xl" />

        {/* IMAGE */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={image.url}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
              {discount}% OFF
            </div>
          )}

          {/* Category Tag */}
          <div className="absolute top-4 right-4 bg-indigo-600/80 text-white text-xs px-3 py-1 rounded-full">
            {category}
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative p-6 space-y-4">

          {/* Product Name */}
          <h3 className="text-lg font-semibold tracking-wide text-white group-hover:text-indigo-400 transition line-clamp-2">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                />
              ))}
            </div>
            <span className="text-gray-400">({reviews})</span>
          </div>

          {/* Price Section */}
          <div className="space-y-1">
            <div className="flex items-end gap-3">
              <span className="text-2xl font-bold text-white">
                ₹{finalprice}
              </span>

              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{price}
                </span>
              )}

              <span className="text-sm text-gray-400 pb-1">
                / {unit}
              </span>
            </div>

            {hasDiscount && (
              <p className="text-xs text-green-400">
                Save ₹{savings}
              </p>
            )}
          </div>

          {/* Stock */}
          <div className="text-xs">
            {stock > 5 ? (
              <span className="text-green-400">In Stock</span>
            ) : stock > 0 ? (
              <span className="text-yellow-400">Only {stock} left</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </div>

          {/* Delivery */}
          <div className="text-xs text-gray-400">
            Delivery in {delivery}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 my-4" />

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
    </Link>
  );
}
