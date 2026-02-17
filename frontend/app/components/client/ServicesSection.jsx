"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ServicesSection() {
  const services = [
    {
      image: "/Slide1.webp",
      title: "Flex & Banner Printing",
      desc: "High-quality flex printing for shops, events, and promotions.",
      points: ["Shop Banners", "Event Flex", "Outdoor Hoardings"],
    },
    {
      image: "/Slide2.webp",
      title: "Hoardings & Outdoor Ads",
      desc: "Large-scale advertising solutions for maximum visibility.",
      points: ["Billboards", "LED Boards", "Glow Sign Boards"],
    },
    {
      image: "/Slide3.webp",
      title: "Poster & Flyer Design",
      desc: "Creative designs that capture attention instantly.",
      points: ["Event Posters", "Marketing Flyers", "Product Promotions"],
    },
    {
      image: "/Slide4.webp",
      title: "Visiting Cards & Stationery",
      desc: "Professional branded printing materials.",
      points: ["Visiting Cards", "Letterheads", "Envelopes"],
    },
    {
      image: "/Slide5.webp",
      title: "Branding & Design",
      desc: "Complete visual identity solutions for businesses.",
      points: ["Logo Design", "Brand Identity", "Packaging Design"],
    },
    {
      image: "/Slide1.webp",
      title: "Customized Print Solutions",
      desc: "Tailored printing services for all branding needs.",
      points: ["Standee Printing", "Vinyl Printing", "Wall Graphics"],
    },
  ];

  return (
    <section
      className="relative py-24 px-6 overflow-hidden
      bg-background text-foreground transition-colors duration-300"
    >

      {/* Subtle Background Grid */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none
        bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_0)]
        dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)]
        [background-size:40px_40px]"
      />

      {/* Heading */}
      <div className="relative max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">
          Our Services
        </h2>

        <p className="text-muted text-lg">
          Premium printing solutions crafted for visibility and impact.
        </p>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden relative">
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4">

          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="min-w-[85%] snap-center rounded-2xl overflow-hidden
              bg-card border border-cardBorder shadow-soft dark:shadow-softDark"
            >
              {/* Image */}
              <div className="relative h-44 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="85vw"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-base font-semibold mb-2">
                  {service.title}
                </h3>

                <p className="text-muted text-sm mb-3">
                  {service.desc}
                </p>

                <ul className="space-y-1 text-sm text-muted">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl overflow-hidden
            bg-card border border-cardBorder shadow-soft dark:shadow-softDark
            transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width:1024px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition">
                {service.title}
              </h3>

              <p className="text-muted text-sm mb-4">
                {service.desc}
              </p>

              <ul className="space-y-2 text-sm text-muted">
                {service.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
