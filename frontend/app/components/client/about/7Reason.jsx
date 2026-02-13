"use client";

import { motion } from "framer-motion";

export default function ReasonsSection() {
  const reasons = [
    {
      img: "/Slide1.webp",
      title: "Premium Print Quality",
      desc: "High-resolution, vibrant printing that makes your brand stand out instantly.",
    },
    {
      img: "/Slide2.webp",
      title: "Fast Turnaround",
      desc: "Quick production & delivery without compromising on quality.",
    },
    {
      img: "/Slide3.webp",
      title: "Creative Expertise",
      desc: "Professional designs tailored to your business identity.",
    },
    {
      img: "/Slide4.webp",
      title: "Local Market Expertise",
      desc: "We understand regional branding and audience behavior.",
    },
    {
      img: "/Slide5.webp",
      title: "Competitive Pricing",
      desc: "Premium quality at affordable and transparent pricing.",
    },
    {
      img: "/slider1.webp",
      title: "Reliable Support",
      desc: "Dedicated assistance from concept to final installation.",
    },
    {
      img: "/slider2.webp",
      title: "Trusted by Businesses",
      desc: "Hundreds of satisfied clients across industries.",
    },
  ];

  return (
    <section className="relative py-32 px-6 bg-black text-white overflow-hidden">

      {/* Soft Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            7 Reasons{" "}
            <span className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
              Why MP Advertisers
            </span>
          </h2>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
            We don’t just print. We create visual impact that builds strong, lasting brands.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              className="group relative bg-white/5 border border-white/10 
              backdrop-blur-xl rounded-3xl p-10 text-center 
              transition-all duration-500 hover:border-indigo-500/60 
              hover:shadow-xl hover:shadow-indigo-500/10"
            >
              {/* Glow Hover Layer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 blur-2xl rounded-3xl" />

              <div className="relative">
                <img
                  src={r.img}
                  alt={r.title}
                  className="w-20 mx-auto mb-6 transition duration-500 group-hover:scale-110"
                />

                <h3 className="text-xl font-semibold mb-4 tracking-wide group-hover:text-indigo-400 transition">
                  {r.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm">
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
