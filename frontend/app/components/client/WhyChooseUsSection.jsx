"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Sparkles, Users } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../lightswind/Accordion";

export default function WhyChooseUsSection() {
  const points = [
    {
      value: "quality",
      icon: <ShieldCheck size={20} />,
      title: "Premium Quality",
      description:
        "High-grade materials and advanced printing technology.",
    },
    {
      value: "speed",
      icon: <Clock size={20} />,
      title: "Fast Turnaround",
      description:
        "On-time delivery without compromising quality.",
    },
    {
      value: "creative",
      icon: <Sparkles size={20} />,
      title: "Creative Expertise",
      description:
        "Professional design solutions tailored to your brand.",
    },
    {
      value: "trusted",
      icon: <Users size={20} />,
      title: "Trusted by 200+ Clients",
      description:
        "Businesses rely on us for consistent results.",
    },
  ];

  return (
    <section className="py-24 bg-background text-foreground relative">

      {/* ================= HEADING ================= */}
      <div className="text-center mb-20 max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Why Choose Us
        </h2>
        <p className="text-muted mt-4 text-base">
          Creative precision. Reliable execution.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* ================= MOBILE (Accordion) ================= */}
        <div className="lg:hidden text-lg">
          <Accordion type="single" collapsible className="w-full">

            {points.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="border-b border-border"
              >
                <AccordionTrigger className="flex items-center gap-4 text-left hover:no-underline py-4">

                  <div className="w-10 h-10 rounded-full 
                  bg-card border border-border 
                  flex items-center justify-center text-primary">
                    {item.icon}
                  </div>

                  <span className="font-medium text-foreground">
                    {item.title}
                  </span>

                </AccordionTrigger>

                <AccordionContent className="text-muted pl-14 pr-4 pb-4">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}

          </Accordion>
        </div>

        {/* ================= DESKTOP (Grid) ================= */}
        <div className="hidden lg:grid grid-cols-4 gap-12">

          {points.map((item, index) => (
            <motion.div
              key={item.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-card border border-border 
              p-6 rounded-xl transition hover:shadow-lg"
            >

              <div className="mb-5 text-primary transition">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {item.title}
              </h3>

              <p className="text-muted text-sm leading-relaxed">
                {item.description}
              </p>

              <div className="mt-6 h-px w-0 group-hover:w-full bg-primary transition-all duration-500" />

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
