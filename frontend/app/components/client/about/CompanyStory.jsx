"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CompanyStory({ data }) {
  return (
    <section className="relative py-20 px-6 overflow-hidden bg-background text-foreground">

      {/* Soft Accent Glow */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      <div className="absolute -top-20 right-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Section Label */}
          <div className="text-sm uppercase tracking-widest text-primary mb-4">
            Our Journey
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 leading-tight">
            {data.title}
          </h2>

          {/* Paragraphs */}
          <div className="space-y-6">
            {data.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-muted leading-relaxed text-base md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-10 text-muted italic">
            “Built on trust. Driven by impact.”
          </div>
        </motion.div>

        {/* ================= RIGHT IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden border border-border shadow-lg">
            <Image
              src={data.image}
              alt="Company"
              width={700}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Floating Experience Card */}
          <div className="absolute -bottom-8 -left-8 bg-card border border-border rounded-2xl px-6 py-4 shadow-md">
            <div className="text-2xl font-bold text-primary">
              10+ Years
            </div>
            <div className="text-sm text-muted">
              Industry Experience
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
