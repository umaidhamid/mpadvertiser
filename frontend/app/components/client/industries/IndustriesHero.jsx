"use client";

import { motion } from "framer-motion";

export default function IndustriesHero() {
  return (
    <section className="relative py-28 border-b border-border overflow-hidden bg-background text-foreground">

      {/* Glow Accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl opacity-40 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Industries We Serve
        </motion.h1>

        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          From local businesses to large enterprises, MP Advertisers delivers
          impactful printing and branding solutions across multiple industries.
        </p>

      </div>
    </section>
  );
}
