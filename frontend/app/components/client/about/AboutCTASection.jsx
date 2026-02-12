"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutCTASection() {
  return (
    <section className="relative py-32 px-6 text-center overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-black pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-semibold mb-8"
        >
          Let’s Build Something Remarkable Together.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Partner with MP Advertisers to create impactful campaigns,
          elevate your brand presence, and drive measurable results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/Contact-Us"
            className="px-10 py-4 rounded-full 
            bg-gradient-to-r from-indigo-600 to-purple-600 
            text-white font-semibold shadow-lg 
            hover:shadow-indigo-500/40 transition duration-300"
          >
            Start Your Project
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
