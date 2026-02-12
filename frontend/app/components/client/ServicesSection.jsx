"use client";

import { motion } from "framer-motion";
import {
 Megaphone,
 MapPin,
 Camera,
 Target,
 Rocket,
 BarChart3,
} from "lucide-react";

export default function ServicesSection() {
const services = [
  {
    icon: <Megaphone size={28} />,
    title: "Flex & Banner Printing",
    desc: "High-quality flex printing for shops, events, promotions, and hoardings.",
    points: ["Shop Banners", "Event Flex", "Outdoor Hoardings"],
  },
  {
    icon: <MapPin size={28} />,
    title: "Hoardings & Outdoor Ads",
    desc: "Large-scale advertising solutions that maximize local visibility.",
    points: ["Billboards", "LED Boards", "Glow Sign Boards"],
  },
  {
    icon: <Camera size={28} />,
    title: "Poster & Flyer Design",
    desc: "Creative poster and flyer designs that grab attention instantly.",
    points: ["Event Posters", "Marketing Flyers", "Product Promotions"],
  },
  {
    icon: <Target size={28} />,
    title: "Visiting Cards & Stationery",
    desc: "Professional business cards and branded stationery printing.",
    points: ["Visiting Cards", "Letterheads", "Envelopes"],
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Branding & Design",
    desc: "Complete branding solutions for businesses and startups.",
    points: ["Logo Design", "Brand Identity", "Packaging Design"],
  },
  {
    icon: <Rocket size={28} />,
    title: "Customized Print Solutions",
    desc: "Tailored printing services for all promotional and branding needs.",
    points: ["Standee Printing", "Vinyl Printing", "Wall Graphics"],
  },
];

  return (
    <section className="py-28 px-6 bg-black text-white relative overflow-hidden">

      {/* Section Heading */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Our Services
        </h2>
        <p className="text-gray-400 text-lg">
          Strategic creativity powered by performance marketing expertise.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="group relative p-8 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500 transition-all duration-300"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-indigo-500 blur-2xl transition duration-500 rounded-xl"></div>

            {/* Icon */}
            <div className="mb-6 text-indigo-500 group-hover:scale-110 transition">
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-4">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 mb-6">
              {service.desc}
            </p>

            {/* Sub Points */}
            <ul className="space-y-2 opacity-80 text-sm text-gray-300">
              {service.points.map((point, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}