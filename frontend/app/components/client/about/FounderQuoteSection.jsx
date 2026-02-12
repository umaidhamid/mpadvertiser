"use client";

import { motion } from "framer-motion";

export default function FounderQuoteSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-black via-white/[0.02] to-black pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >

          <div className="text-indigo-400 text-5xl mb-6">“</div>

          <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-10">
            Advertising is not just about visibility — it’s about creating impact,
            building trust, and delivering measurable growth for every client we serve.
          </p>

          <div className="text-lg font-semibold">
            Umaid Hamid
          </div>

          <div className="text-gray-400 text-sm">
            Founder & Managing Director
          </div>

        </motion.div>

      </div>
    </section>
  );
}
