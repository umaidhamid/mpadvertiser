"use client";

import { motion } from "framer-motion";

export default function FeaturedClientsSection() {
  const clients = [
    "Slide1.webp",
    "Slide2.webp",
    "Slide3.webp",
    "Slide4.webp",
    "Slide5.webp",
  ];

  return (
    <section className="relative py-2 bg-black text-white overflow-hidden">

      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Trusted by Leading Brands
        </h2>
        <p className="text-gray-400 mt-4">
          Businesses across industries rely on our expertise.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-12"
        >
          {clients.map((logo, index) => (
            <div
              key={index}
              className="opacity-60 hover:opacity-100 transition duration-300 grayscale hover:grayscale-0"
            >
              <img
                src={logo}
                alt="Client Logo"
                className="h-20 md:h-24 object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
