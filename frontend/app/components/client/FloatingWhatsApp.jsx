"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/919149455296" 
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-6 right-6 z-50
      w-14 h-14 rounded-full
      bg-green-500 flex items-center justify-center
      shadow-lg shadow-green-500/30
      hover:scale-110 transition duration-300"
    >
      <FaWhatsapp size={26} className="text-white" />
    </motion.a>
  );
}
