"use client";

import { motion } from "framer-motion";
import { Rocket, Eye, Target } from "lucide-react";

export default function MissionVisionPurpose() {
  const items = [
    {
      icon: <Rocket size={26} />,
      title: "Our Mission",
      description:
        "To transform brands into powerful market leaders through strategic marketing, impactful print solutions, and bold creative execution that drives measurable growth.",
      gradient: "from-pink-500 via-purple-500 to-indigo-500",
    },
    {
      icon: <Eye size={26} />,
      title: "Our Vision",
      description:
        "To become the most trusted advertising and print partner for ambitious businesses by delivering consistency, reliability, and innovation in every project we undertake.",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
    },
    {
      icon: <Target size={26} />,
      title: "Our Purpose",
      description:
        "We exist to simplify and accelerate the branding and printing process, giving businesses a seamless, stress-free experience from concept to completion.",
      gradient: "from-purple-500 via-pink-500 to-indigo-500",
    },
  ];

  return (
    <section className="relative py-12 px-6 bg-black text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 blur-3xl opacity-40"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Foundation
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            The principles that guide every banner we print, every campaign we launch,
            and every brand we elevate.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">

          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg transition-all duration-500 hover:border-pink-500"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-r from-indigo-600 to-pink-600 blur-2xl transition duration-500 rounded-2xl"></div>

              {/* Icon */}
              <div
                className={`relative w-16 h-16 mb-8 rounded-full flex items-center justify-center bg-gradient-to-r ${item.gradient}`}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="relative text-2xl font-semibold mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="relative text-gray-400 leading-relaxed">
                {item.description}
              </p>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
