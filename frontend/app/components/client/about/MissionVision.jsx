"use client";

import { motion } from "framer-motion";
import { Target, Eye, Sparkles } from "lucide-react";

export default function MissionVision({ data }) {
  return (
    <section className="relative py-28 px-6 overflow-hidden bg-background text-foreground">

      {/* Soft Background Glow */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* ================= HEADING ================= */}
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

          <p className="text-muted max-w-2xl mx-auto">
            Purpose-driven strategy. Long-term brand growth. Measurable impact.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-card
            border border-border
            hover:border-primary transition duration-500"
          >
            <div className="mb-6 text-primary">
              <Target size={28} />
            </div>

            <h3 className="text-2xl font-semibold mb-6">
              Our Mission
            </h3>

            <p className="text-muted leading-relaxed text-lg">
              {data.mission}
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-card
            border border-border
            hover:border-primary transition duration-500"
          >
            <div className="mb-6 text-primary">
              <Eye size={28} />
            </div>

            <h3 className="text-2xl font-semibold mb-6">
              Our Vision
            </h3>

            <p className="text-muted leading-relaxed text-lg">
              {data.vision}
            </p>
          </motion.div>

        </div>

        {/* ================= PHILOSOPHY ================= */}
        {data.philosophy && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-24 text-center max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6 text-primary">
              <Sparkles size={24} />
            </div>

            <p className="text-muted text-lg md:text-xl italic leading-relaxed">
              “{data.philosophy}”
            </p>
          </motion.div>
        )}

      </div>
    </section>
  );
}
