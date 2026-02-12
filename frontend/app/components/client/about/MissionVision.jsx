"use client";

import { motion } from "framer-motion";
import { Target, Eye, Sparkles } from "lucide-react";

export default function MissionVision({ data }) {
  return (
    <section className="relative py-28 px-6 overflow-hidden">

      {/* Background depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-white/[0.02] to-black pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-indigo-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6"
          >
            Our Mission & Vision
          </motion.h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Purpose-driven strategy. Long-term brand growth. Measurable impact.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-white/[0.04] 
            border border-white/10 backdrop-blur-xl 
            hover:border-indigo-500/40 transition duration-500"
          >
            <div className="mb-6 text-indigo-400">
              <Target size={28} />
            </div>

            <h3 className="text-2xl font-semibold mb-6">
              Our Mission
            </h3>

            <p className="text-gray-400 leading-relaxed text-lg">
              {data.mission}
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-white/[0.04] 
            border border-white/10 backdrop-blur-xl 
            hover:border-purple-500/40 transition duration-500"
          >
            <div className="mb-6 text-purple-400">
              <Eye size={28} />
            </div>

            <h3 className="text-2xl font-semibold mb-6">
              Our Vision
            </h3>

            <p className="text-gray-400 leading-relaxed text-lg">
              {data.vision}
            </p>
          </motion.div>

        </div>

        {/* Philosophy Block */}
        {data.philosophy && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-24 text-center max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6 text-indigo-400">
              <Sparkles size={24} />
            </div>

            <p className="text-white/70 text-lg md:text-xl italic leading-relaxed">
              “{data.philosophy}”
            </p>
          </motion.div>
        )}

      </div>
    </section>
  );
}