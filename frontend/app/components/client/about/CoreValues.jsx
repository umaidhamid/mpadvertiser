"use client";

import { motion } from "framer-motion";

export default function CoreValues({ values }) {
  return (
    <section className="relative py-28 px-6 overflow-hidden">

      {/* Background depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-white/[0.02] to-black pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-96 h-96 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            Our Core Values
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            The principles that guide every decision, every campaign, and every partnership.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-10 rounded-3xl 
              bg-white/[0.04] border border-white/10 
              backdrop-blur-xl transition duration-500
              hover:border-indigo-500/40 hover:-translate-y-2"
            >
              {/* Number Accent */}
              <div className="absolute top-6 right-6 text-sm text-white/20 font-bold">
                0{i + 1}
              </div>

              {/* Accent Bar */}
              <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 mb-6 transition-all duration-500 group-hover:w-20" />

              {/* Title */}
              <h4 className="text-xl font-semibold mb-4">
                {value.title}
              </h4>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {value.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}