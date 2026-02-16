"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useState } from "react";
import { Share2, Copy } from "lucide-react"
import { toast } from "sonner";
export default function ProductCard({ product }) {

  const [copied, setCopied] = useState(false);


  const {
    _id,
    image,
    name,
    category,
    price,
    discount,
    finalprice,
    unit,
    slug,


    stock = 10,
    delivery = "2-3 Days",
  } = product;

  const { addToCart } = useContext(CartContext);

  const hasDiscount = discount > 0;
  const savings = price - finalprice;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product) return;

    addToCart(product, {
      label: product.unit,
      price: product.finalprice,
    });

    toast.success("Added to cart");
  };

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (navigator.share) {
      await navigator.share({
        title: name,
        text: "Check out this product",
        url: fullUrl,
      });
    } else {
      handleCopy(e);
    }
  };
  const fullUrl =
    typeof window !== "undefined"
      ? window.location.origin + `/products/${slug}`
      : "";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/[0.03]
      border border-white/10 rounded-3xl overflow-hidden
      backdrop-blur-xl transition-all duration-500
      hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
    >

      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden">
        <Link href={`/Products/${slug}`} className="block">
          <img
            src={image?.url}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
            {discount}% OFF
          </div>
        )}

        <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
          {category}
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative p-6 space-y-4">

        <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition line-clamp-2">
          {name}
        </h3>



        {/* Price */}
        <div className="flex items-end gap-3">
          <span className="text-2xl font-bold text-white">
            ₹{finalprice}
          </span>

          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ₹{price}
            </span>
          )}

          <span className="text-sm text-gray-400">
            / {unit}
          </span>
        </div>

        {hasDiscount && (
          <p className="text-xs text-green-400">
            Save ₹{savings}
          </p>
        )}

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

        <div className="h-px bg-white/10 my-4" />

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">

          {/* View */}
          <div
            className="flex-1 text-center py-3 rounded-xl
              bg-white text-black font-medium
              transition duration-300
              group-hover:bg-indigo-600 group-hover:text-white"
          >
            <Link href={`/Products/${slug}`}>View Details</Link>
          </div>

          {/* Add To Cart */}
          {stock > 0 && (
            <button
              onClick={handleAddToCart}
              className="px-4 py-3 rounded-xl bg-indigo-600 text-white
                hover:bg-indigo-700 transition flex items-center justify-center"
            >
              <ShoppingCart size={16} />
            </button>
          )}
          {/* Share */}
          <button
            onClick={handleShare}
            className="px-4 py-3 rounded-xl bg-white/10 text-white
  hover:bg-indigo-600 transition flex items-center justify-center"
          >
            <Share2 size={16} />
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="px-4 py-3 rounded-xl bg-white/10 text-white
  hover:bg-indigo-600 transition flex items-center justify-center"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>

        </div>

      </div>

    </motion.div>
  );
}
