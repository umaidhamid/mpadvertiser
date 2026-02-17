"use client";

import { motion } from "framer-motion";

export default function FounderQuoteSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden bg-background text-foreground">

      {/* Soft Accent Glow */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >

          {/* Quote Mark */}
          <div className="text-primary text-5xl mb-6">“</div>

          {/* Quote Text */}
          <p className="text-xl md:text-2xl text-muted leading-relaxed mb-10">
            Advertising is not just about visibility — it’s about creating impact,
            building trust, and delivering measurable growth for every client we serve.
          </p>

          {/* Name */}
          <div className="text-lg font-semibold">
            Owais Hamid
          </div>

          {/* Role */}
          <div className="text-muted text-sm">
            Co-Founder & Operations Head
          </div>

        </motion.div>

      </div>
    </section>
  );
}
