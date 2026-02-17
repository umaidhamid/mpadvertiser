"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MidCTASection() {
  return (
    <section className="relative py-28 bg-background text-foreground overflow-hidden">

      {/* Subtle Brand Glow */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Ready to Elevate Your Brand?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-muted max-w-2xl mx-auto mb-10"
        >
          Let’s create impactful designs and premium prints that make your business stand out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Primary Button */}
          <Link
            href="/Contact-Us"
            className="px-8 py-4 rounded-full
            bg-primary text-primary-foreground
            font-semibold shadow-md
            hover:opacity-90 transition duration-300"
          >
            Get a Free Quote
          </Link>

          {/* Secondary Button */}
          <Link
            href="/Products"
            className="px-8 py-4 rounded-full
            border border-border
            text-foreground
            hover:bg-card transition duration-300"
          >
            View Our Products
          </Link>
        </motion.div>

      </div>
    </section>
  );
}