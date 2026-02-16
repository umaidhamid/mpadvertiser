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
    { number: 3000, suffix: "+", label: "Projects Completed" },
    { number: 1200, suffix: "+", label: "Happy Clients" },
    { number: 10, suffix: "+", label: "Years of Experience" },
    { number: 25, suffix: "+", label: "Cities Served" },
  ];

  return (
    <section className="bg-background text-white py-25 px-6">

      <div className="text-center mb-20 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 text-white ">
          Proven Results
        </h2>

        <p className="text-base opacity-70">
          Real numbers. Real growth. Real impact.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-14 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl md:text-5xl font-bold">
              <Counter end={stat.number} suffix={stat.suffix} />
            </div>

            <p className="mt-3 text-sm opacity-60 tracking-wide">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
