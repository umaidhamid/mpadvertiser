"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Share2, Copy, Check } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { toast } from "sonner";

export default function ProductCard({ product }) {
  const [copied, setCopied] = useState(false);

  const {
    image,
    name,
    category,
    price,
    discount,
    finalprice,
    unit,
    slug,
    stock = 10,
  } = product;

  const { addToCart } = useContext(CartContext);

  const hasDiscount = discount > 0;
  const savings = price - finalprice;

  const fullUrl =
    typeof window !== "undefined"
      ? window.location.origin + `/Products/${slug}`
      : "";

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, {
      label: unit,
      price: finalprice,
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

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card border border-border rounded-3xl overflow-hidden transition-all duration-500 hover:border-primary/40"
    >
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <Link href={`/Products/${slug}`} className="block h-full">
          <img
            src={image?.url}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-foreground text-background text-xs px-3 py-1 rounded-full">
            {discount}% OFF
          </div>
        )}

        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
          {category}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-4">

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition line-clamp-2">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-3 flex-wrap">

          <span className="text-2xl font-bold text-foreground">
            ₹{finalprice}
          </span>

          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{price}
            </span>
          )}

          <span className="text-sm text-muted-foreground">
            / {unit}
          </span>
        </div>

        {hasDiscount && (
          <p className="text-xs font-medium text-green-600 dark:text-green-400">
            You save ₹{savings}
          </p>
        )}

        {/* Stock */}
        <div className="text-xs font-medium">
          {stock > 5 ? (
            <span className="text-green-600 dark:text-green-400">
              In Stock
            </span>
          ) : stock > 0 ? (
            <span className="text-yellow-600 dark:text-yellow-400">
              Only {stock} left
            </span>
          ) : (
            <span className="text-red-600 dark:text-red-400">
              Out of Stock
            </span>
          )}
        </div>

        <div className="h-px bg-border my-4" />

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">

          {/* View Details */}
          <Link
            href={`/Products/${slug}`}
            className="flex-1 text-center py-3 rounded-xl bg-primary text-primary-foreground font-medium transition duration-300 hover:opacity-90"
          >
            View Details
          </Link>

          {/* Add To Cart */}
          {stock > 0 && (
            <button
              onClick={handleAddToCart}
              className="px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition flex items-center justify-center"
            >
              <ShoppingCart size={16} />
            </button>
          )}

          {/* Share */}
          <button
            onClick={handleShare}
            className="px-4 py-3 rounded-xl bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition flex items-center justify-center"
          >
            <Share2 size={16} />
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="px-4 py-3 rounded-xl bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition flex items-center justify-center"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>

        </div>
      </div>
    </motion.div>
  );
}
