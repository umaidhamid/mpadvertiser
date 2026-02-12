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
    <section className="relative py-28 bg-black text-white overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold">
          Why Choose Us
        </h2>
        <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
          We combine creativity, precision, and reliability to deliver
          exceptional printing solutions.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {points.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group p-8 rounded-3xl 
            bg-white/[0.03] border border-white/10 
            backdrop-blur-xl transition-all duration-500
            hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div className="mb-6 text-indigo-400 group-hover:text-indigo-300 transition">
              {item.icon}
            </div>

            <h3 className="text-xl font-semibold mb-4">
              {item.title}
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
