"use client";

import { motion } from "framer-motion";

export default function ReasonsSection() {
  const reasons = [
    {
      img: "./Reasons/MARKETTING PROFESSIONAL.webp",
      title: "Marketing Professional Focus",
      desc: "Confidence in print and project execution.",
    },
    {
      img: "./Reasons/RAPID RESPONSE.webp",
      title: "Rapid Response Service",
      desc: "Fast quotes, tracking & guaranteed timelines.",
    },
    {
      img: "./Reasons/ONE STOP SHOP.webp",
      title: "One Stop Shop",
      desc: "From concept to delivery with full accountability.",
    },
    {
      img: "./Reasons/GRAPHIC DESIGN.webp",
      title: "Graphic Design",
      desc: "Modern tools turning ideas into visuals.",
    },
    {
      img: "./Reasons/DEDICATED TEAM.webp",
      title: "Dedicated Team",
      desc: "Experienced professionals focused on success.",
    },
    {
      img: "./Reasons/PRODUCTION SAMPLES.webp",
      title: "Production Samples",
      desc: "Pre-production digital assurance.",
    },
    {
      img: "./Reasons/PRINT MANAGEMENT.webp",
      title: "Print Management",
      desc: "End-to-end print handled perfectly.",
    },
  ];

  return (
    <section className="relative py-32 px-6 bg-background text-foreground overflow-hidden">

      {/* Soft Background Accent */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* ================= HEADING ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            7 Reasons{" "}
            <span className="bg-gradient-to-r from-purple-200 to-purple-500 bg-clip-text text-transparent">
              Why MP Advertisers
            </span>
          </h2>

          <p className="text-muted mt-6 max-w-2xl mx-auto text-lg">
            We don’t just print. We create visual impact that builds strong, lasting brands.
          </p>
        </motion.div>

        {/* ================= GRID ================= */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              className="group relative bg-card border border-border 
              rounded-3xl p-10 text-center 
              transition-all duration-500 
              hover:border-primary hover:shadow-lg"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
              transition duration-700 bg-primary/10 blur-2xl rounded-3xl pointer-events-none" />

              <div className="relative">
                <img
                  src={r.img}
                  alt={r.title}
                  className="w-20 mx-auto mb-6 transition duration-500 group-hover:scale-110"
                />

                <h3 className="text-xl font-semibold mb-4 tracking-wide group-hover:text-primary transition">
                  {r.title}
                </h3>

                <p className="text-muted leading-relaxed text-sm">
                  {r.desc}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
