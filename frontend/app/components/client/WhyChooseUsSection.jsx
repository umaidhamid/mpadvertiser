"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Sparkles, Users } from "lucide-react";

export default function WhyChooseUsSection() {
  const points = [
    {
      icon: <ShieldCheck size={26} />,
      title: "Premium Quality",
      description: "High-grade materials and advanced printing technology.",
    },
    {
      icon: <Clock size={26} />,
      title: "Fast Turnaround",
      description: "On-time delivery without compromising quality.",
    },
    {
      icon: <Sparkles size={26} />,
      title: "Creative Expertise",
      description: "Professional design solutions tailored to your brand.",
    },
    {
      icon: <Users size={26} />,
      title: "Trusted by 200+ Clients",
      description: "Businesses rely on us for consistent results.",
    },
  ];

  return (
   <section className="py-28 bg-black text-white">

  <div className="text-center mb-24 max-w-2xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-semibold">
      Why Choose Us
    </h2>
    <p className="text-gray-500 mt-4 text-base">
      Creative precision. Reliable execution.
    </p>
  </div>

  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">

    {points.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="text-left"
      >
        <div className="mb-5 text-indigo-400">
          {item.icon}
        </div>

        <h3 className="text-lg font-semibold mb-3">
          {item.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed">
          {item.description}
        </p>
      </motion.div>
    ))}

  </div>
</section>
  );
}
