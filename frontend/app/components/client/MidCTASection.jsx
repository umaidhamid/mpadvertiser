"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MidCTASection() {
  return (
    <section className="relative py-28 bg-black text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-purple-600/10 pointer-events-none" />

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
          className="text-gray-400 max-w-2xl mx-auto mb-10"
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
          <Link
            href="/Contact-Us"
            className="px-8 py-4 rounded-full 
            bg-gradient-to-r from-indigo-600 to-purple-600 
            text-white font-semibold shadow-lg 
            hover:shadow-indigo-500/40 transition duration-300"
          >
            Get a Free Quote
          </Link>

          <Link
            href="/Products"
            className="px-8 py-4 rounded-full border border-white/20 
            text-white hover:bg-white/10 transition duration-300"
          >
            View Our Products
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
