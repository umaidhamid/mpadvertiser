"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Volume2, VolumeX, Moon, Sun, Star } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  const router = useRouter();
  const [muted, setMuted] = useState(true);
  const [isNight, setIsNight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Parallax scroll effect
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityFade = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden select-none bg-black"
    >
      {/* 1. Dynamic Background System */}
      <div className="absolute inset-0 z-0">
        {!isMobile ? (
          <motion.video
            key={isNight ? "night" : "day"}
            style={{ y: y1 }}
            className="absolute inset-0 w-full h-full object-cover scale-110"
            autoPlay
            loop
            muted={muted}
            playsInline
            src={isNight ? "/night.mp4" : "/background.mp4"}
          />
        ) : (
          <Image
            src="/herobannerhero-mobile2.webp"
            alt="Hero background"
            fill
            className="object-cover"
          />
        )}

        {/* Animated Gradient Mesh Overlay */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
          className="absolute inset-0 z-[1]"
        />

        {/* Deep Overlay with Glass effect */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-[2]" />
      </div>

      {/* 2. Controls - Glassmorphism UI */}
      {!isMobile && (
        <div className="absolute top-24 right-8 z-50 flex gap-4">
          {[
            { id: 'mute', icon: muted ? <VolumeX size={20} /> : <Volume2 size={20} />, action: () => setMuted(!muted) },
            { id: 'theme', icon: isNight ? <Sun size={20} /> : <Moon size={20} />, action: () => setIsNight(!isNight) }
          ].map((btn) => (
            <motion.button
              key={btn.id}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.9 }}
              onClick={btn.action}
              className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white shadow-xl transition-colors"
            >
              {btn.icon}
            </motion.button>
          ))}
        </div>
      )}

      {/* 3. Main Content Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity: opacityFade }}
        className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 py-20 min-h-screen"
      >
        {/* Sub-header with Reveal */}
        <motion.h2
          variants={itemVariants}
          className="text-sm md:text-lg tracking-[0.4em] uppercase mb-6 font-light text-blue-400"
        >
          Elevating Brands Through Precision
        </motion.h2>

        {/* Logo with Glow & Floating Animation */}
        <motion.div
          variants={itemVariants}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-10 group"
        >
          <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <Image
            src="/MAIN PAGE LOGO.webp"
            alt="MP Advertisers Logo"
            width={380}
            height={190}
            priority
            className="relative z-10 max-w-[80vw] md:max-w-[400px] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          />
        </motion.div>

        {/* Body Text */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-base md:text-xl leading-relaxed text-gray-300 mb-12 font-light"
        >
          A full-service digital advertising and branding agency. We craft
          <span className="text-white font-medium"> bold campaigns</span>, elevate
          identities, and deliver measurable growth.
        </motion.p>

        {/* Enhanced Interactive Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/Products")}
            className="group relative px-10 py-4 rounded-full text-base font-bold tracking-wider 
                       bg-white text-black overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10">VIEW PRODUCTS</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open("https://search.google.com/local/writereview?...", "_blank")}
            className="flex items-center gap-2 px-10 py-4 rounded-full text-base font-bold tracking-wider 
                       border-2 border-white/30 text-white backdrop-blur-sm
                       transition-all duration-300 hover:border-white"
          >
            <Star size={18} className="text-yellow-400 group-hover:fill-current" />
            RATE US ON GOOGLE
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative Light Streak */}
      <motion.div
        animate={{ x: ['-100%', '200%'], opacity: [0, 0.3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-0 w-64 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent rotate-45 z-[5]"
      />
    </section>
  );
};

export default HeroSection;