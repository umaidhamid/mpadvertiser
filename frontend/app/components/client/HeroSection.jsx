"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Volume2, VolumeX, Moon, Sun } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  const router = useRouter();

  const [muted, setMuted] = useState(true);
  const [isNight, setIsNight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* Background */}
      {!isMobile ? (
        <video
          key={isNight ? "night" : "day"}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="metadata"
          src={isNight ? "/night.mp4" : "/background.mp4"}
        />
      ) : (
        <Image
          src="/herobannerhero-mobile2.webp"
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Controls (Desktop Only) */}
      {!isMobile && (
        <div className="absolute top-6 right-6 z-50 flex gap-3">
          <button
            onClick={() => setMuted((p) => !p)}
            className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:scale-110 transition duration-200"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button
            onClick={() => setIsNight((p) => !p)}
            className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:scale-110 transition duration-200"
          >
            {isNight ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 py-20 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-xl md:text-2xl tracking-widest mb-4 font-medium text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Welcome to
        </motion.h2>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mb-8"
        >
          <Image
            src="/MAIN PAGE LOGO.webp"
            alt="MP Advertisers Logo"
            width={320}
            height={160}
            priority
            className="max-w-[85%] mx-auto"
          />
        </motion.div>

        <motion.p
          className="max-w-3xl text-sm md:text-lg leading-relaxed text-gray-200 mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          MP Advertisers is a full-service digital advertising and branding
          agency. We craft bold campaigns, elevate brand identity, and deliver
          measurable growth through strategy, creativity, and precision.
        </motion.p>

        {/* Professional Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/Products")}
            className="px-8 py-3 rounded-full text-base font-semibold tracking-wide 
                       bg-white text-black hover:bg-gray-200 
                       shadow-2xl transition-all duration-300"
          >
            View Products
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open(
                "https://search.google.com/local/writereview?placeid=ChIJq8eu53OP4TgRzjXqcw52vrk",
                "_blank"
              )
            }
            className="px-8 py-3 rounded-full text-base font-semibold tracking-wide 
                       border border-white text-white 
                       hover:bg-white hover:text-black 
                       transition-all duration-300"
          >
            Rate Us on Google
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
