"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Let’s Print Something Bold.
      </h2>

      <p className="text-gray-400 text-lg mb-10 leading-relaxed">
        From banners and billboards to business cards and full branding,
        MP Advertisers delivers high-impact print solutions.
      </p>

      <div className="space-y-6 text-gray-300">

        <div className="flex items-center gap-4">
          <MapPin className="text-indigo-500" />
          1st Floor Bhat Complex, Nowgam, Srinagar J&K - 190015
        </div>

        <div className="flex items-center gap-4">
          <Phone className="text-indigo-500" />
          +91 9149455296 / +91 9796951150
        </div>

        <div className="flex items-center gap-4">
          <Mail className="text-indigo-500" />
          mpadtvs@gmail.com
        </div>

        <div className="flex items-center gap-4">
          <Clock className="text-indigo-500" />
          Mon - Sat: 9:00 AM - 7:00 PM
        </div>

      </div>
    </motion.div>
  );
}
