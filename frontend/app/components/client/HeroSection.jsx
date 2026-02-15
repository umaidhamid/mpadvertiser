
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
    <section className="relative w-full h-screen overflow-hidden">

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
          src={isNight ? "/night.mp4" : "/background.mp4"} // from public
        />
      ) : (
        <Image
          // src="/hero-mobile.webp" // from public
          src="/herobannerhero-mobile2.webp" // from public
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Controls */}
      <div className="absolute top-15 right-5 z-50 flex gap-3">
        <button
          onClick={() => setMuted((p) => !p)}
          className="p-2 bg-black/60 rounded-full text-white hover:scale-110 transition"
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <button
          onClick={() => setIsNight((p) => !p)}
          className="p-2 bg-black/60 rounded-full text-white hover:scale-110 transition"
        >
          {isNight ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-3xl tracking-widest mb-3 font-medium"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Welcome
        </motion.h2>

        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mb-6"
        >
          <Image
            src="/MAIN PAGE LOGO.webp"  // from public
            alt="MP Advertisers Logo"
            width={300}
            height={150}
            priority
            className="max-w-[90%] mx-auto"
          />
        </motion.div>

        <motion.p
          className="max-w-5xl text-base md:text-lg leading-8 text-gray-200 mb-10 px-2"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          MP Advertisers is a full-service digital advertising and branding
          agency based in India. We turn ideas into bold campaigns that help
          brands stand out and grow with measurable results.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-8 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/Products")}
            className="px-10 py-4 text-lg font-semibold rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-xl"
          >
            View Products
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open(
                "https://search.google.com/local/writereview?placeid=ChIJq8eu53OP4TgRzjXqcw52vrk",
                "_blank"
              )
            }
            className="px-10 py-4 text-lg font-semibold rounded-xl bg-gradient-to-br from-pink-500 to-red-500 text-white shadow-xl"
          >
            Rate Us on Google
          </motion.button>
        </motion.div>
      </motion.div>
      <div
        style={{
          width: "100%",
          padding: "4rem 1rem",
          display: "flex",
          justifyContent: "center",
        }}
        className="bg-gray-900"
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              marginBottom: "2rem",
              color: "white",
            }}
          >
            Our Work
          </h2>

          {/* <ImageSlider /> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
