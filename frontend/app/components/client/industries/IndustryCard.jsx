"use client";

import { motion } from "framer-motion";

export default function IndustryCard({ industry }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-white/[0.03] border border-white/10 
      rounded-3xl overflow-hidden backdrop-blur-xl 
      hover:border-indigo-500/40 transition-all duration-500"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={industry.image}
          alt={industry.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition">
          {industry.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed">
          {industry.description}
        </p>
      </div>
    </motion.div>
  );
}
