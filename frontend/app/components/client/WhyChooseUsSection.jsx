"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Sparkles, Users } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../lightswind/Accordion"; // adjust path if needed

export default function WhyChooseUsSection() {
  const points = [
    {
      value: "quality",
      icon: <ShieldCheck size={20} />,
      title: "Premium Quality",
      description: "High-grade materials and advanced printing technology.",
    },
    {
      value: "speed",
      icon: <Clock size={20} />,
      title: "Fast Turnaround",
      description: "On-time delivery without compromising quality.",
    },
    {
      value: "creative",
      icon: <Sparkles size={20} />,
      title: "Creative Expertise",
      description: "Professional design solutions tailored to your brand.",
    },
    {
      value: "trusted",
      icon: <Users size={20} />,
      title: "Trusted by 200+ Clients",
      description: "Businesses rely on us for consistent results.",
    },
  ];

  return (
    <section className="py-5 bg-black text-white relative">

      {/* Heading */}
      <div className="text-center mb-20 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Why Choose Us
        </h2>
        <p className="text-gray-500 mt-4 text-base">
          Creative precision. Reliable execution.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* ================= MOBILE (Accordion) ================= */}
        <div className="lg:hidden text-xl">
          <Accordion type="single" collapsible className="w-full">

            {points.map((item, index) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="border-white/10"
              >
                <AccordionTrigger className="flex items-center gap-4 text-left hover:no-underline">

                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 
                    flex items-center justify-center text-indigo-400">
                    {item.icon}
                  </div>

                  <span className="font-medium  text-white">
                    {item.title}
                  </span>

                </AccordionTrigger>

                <AccordionContent className="text-gray-400 pl-14 pr-4">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}

          </Accordion>
        </div>

        {/* ================= DESKTOP (Grid) ================= */}
        <div className="hidden lg:grid grid-cols-4 gap-16">

          {points.map((item, index) => (
            <motion.div
              key={item.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-left group"
            >

              <div className="mb-5 text-indigo-400 group-hover:text-indigo-300 transition">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>

              <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r 
                from-indigo-600 to-purple-600 transition-all duration-500" />

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
