"use client";

import { motion } from "framer-motion";

export default function GalleryItem({ image, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative overflow-hidden rounded-2xl cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={image}
        alt="Work Image"
        className="w-full h-auto object-cover transition duration-700 group-hover:scale-110"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
        <span className="text-white text-sm tracking-wide">
          View Image
        </span>
      </div>
    </motion.div>
  );
}