"use client";

import { motion } from "framer-motion";

export default function IndustriesHero() {
  return (
    <section className="relative py-28 border-b border-white/10 overflow-hidden bg-black text-white">

      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Industries We Serve
        </motion.h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          From local businesses to large enterprises, MP Advertisers delivers
          impactful printing and branding solutions across multiple industries.
        </p>

      </div>
    </section>
  );
}