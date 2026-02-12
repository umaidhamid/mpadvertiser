"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Counter({ end, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const stats = [
    { number: 150, suffix: "+", label: "Campaigns Launched" },
    { number: 300, suffix: "%", label: "Average ROI Growth" },
    { number: 5, suffix: "M+", label: "Monthly Audience Reach" },
    { number: 98, suffix: "%", label: "Client Retention Rate" },
  ];

  return (
    <section className="bg-black text-white py-12 px-1">
      
      {/* Section Heading */}
      <div className="text-center mb-10 max-w-4 xl:max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Proven Results That Speak for Themselves
        </h2>
        <p className="text-gray-400 text-lg">
          We don’t just create campaigns — we build measurable growth strategies 
          that deliver real business impact.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              <Counter end={stat.number} suffix={stat.suffix} />
            </div>
            <p className="mt-5 text-gray-400 tracking-wide">
              {stat.label}
            </p>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 blur-2xl opacity-10 bg-indigo-500 rounded-full"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
