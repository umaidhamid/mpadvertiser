"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function ServicesSection() {
  const containerRef = useRef(null);

  // Parallax effect for background elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

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

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative py-18 px-2 overflow-hidden bg-background text-foreground transition-colors duration-500"
    >
      {/* 1. DYNAMIC COLOR SYSTEM: Animated Gradient Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[120px]"
        />
      </div>

      {/* 2. PARALLAX GRID: Subtle Background Grid */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 opacity-20 pointer-events-none
        bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)]
        dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)]
        [background-size:40px_40px]"
      />

      {/* Heading with Reveal Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative z-10 max-w-3xl mx-auto text-center mb-16"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
        >
          Our <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-orange-400">Services</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-muted text-lg opacity-80"
        >
          Premium printing solutions crafted for visibility and impact.
        </motion.p>
      </motion.div>

      {/* ================= MOBILE (Enhanced with Snap & Fade) ================= */}
      <div className="lg:hidden relative z-10">
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-8 no-scrollbar">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="min-w-[85%] snap-center rounded-2xl overflow-hidden
              bg-card/80 backdrop-blur-md border border-white/10 shadow-xl"
            >
              <div className="relative h-48 w-full">
                <Image src={service.image} alt={service.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-muted text-sm mb-4">{service.desc}</p>
                <ul className="space-y-1">
                  {service.points.map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm opacity-80">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= DESKTOP (Enhanced with Stagger & Glassmorphism) ================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="hidden lg:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 }
            }}
            className="group relative rounded-3xl overflow-hidden
            bg-white/5 dark:bg-white/[0.03] backdrop-blur-xl
            border border-white/10 dark:border-white/5 
            shadow-[0_4px_25px_0_rgba(0,0,0,0.1)]
            hover:shadow-primary/20 hover:border-primary/30
            transition-all duration-500"
          >
            {/* Image with Zoom and Overlay */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60" />

              {/* Subtle Floating Icon/Light Streak Effect */}
              <motion.div
                animate={{ x: [-20, 20], opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
              />
            </div>

            {/* Content with Micro-interactions */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-muted/80 text-sm mb-6 line-clamp-2">
                {service.desc}
              </p>

              <ul className="space-y-3">
                {service.points.map((point, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.6)]" />
                    {point}
                  </motion.li>
                ))}
              </ul>

              {/* Subtle Button Shadow/Glow on Card Hover */}
             
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}