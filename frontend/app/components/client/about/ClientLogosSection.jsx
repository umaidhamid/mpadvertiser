"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ClientLogosSection({ clients }) {
  return (
    <section className="relative py-24 px-6 bg-white/[0.02] overflow-hidden">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Trusted By Leading Brands
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We’ve partnered with businesses across industries to deliver
            impactful advertising solutions.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 items-center">

          {clients.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition duration-300"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={140}
                height={60}
                className="object-contain"
              />
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
