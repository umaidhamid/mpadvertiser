"use client";

import { motion } from "framer-motion";

export default function IndustryCard({ industry }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-card border border-border 
      rounded-3xl overflow-hidden 
      transition-all duration-500 
      hover:border-primary/40 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={industry.image}
          alt={industry.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition">
          {industry.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {industry.description}
        </p>
      </div>
    </motion.div>
  );
}
