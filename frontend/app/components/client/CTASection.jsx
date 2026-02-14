"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

export default function CTASection() {
  const embedMap =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.025067312882!2d74.8295589!3d34.017567500000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18f73e7aec7ab%3A0xb9be760e73ea35ce!2sMP%20Advertisers!5e0!3m2!1sen!2sin!4v1761542575986!5m2!1sen!2sin";

  const googleMapsLink = "https://maps.app.goo.gl/8mkpm5o7K3m6MEdk8";

  return (
    <section className="relative py-24 px-6 bg-black text-white border-t border-white/10 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 blur-3xl opacity-40"></div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Let’s Print Something Bold.
          </h2>

          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            From banners and billboards to visiting cards and complete branding,
            MP Advertisers delivers high-quality advertising solutions that
            elevate your business presence.
          </p>

          {/* Contact Card */}
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 space-y-6">

            <div className="flex items-start gap-4">
              <MapPin className="text-indigo-500 mt-1" size={20} />
              <p className="text-sm text-gray-300 leading-relaxed">
                1st Floor Bhat Complex, Aribagh Stop, Nowgam,
                Srinagar J&K - 190015
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-indigo-500" size={20} />
              <p className="text-sm text-gray-300">
                +91 9149455296 / +91 9796951150
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-indigo-500" size={20} />
              <p className="text-sm text-gray-300">
                mpadtvs@gmail.com
              </p>
            </div>

            <div className="pt-4">
              <a
                href="tel:+919149455296"
                className="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full 
                bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                font-semibold text-white shadow-lg hover:scale-105 transition"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE – MAP */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition duration-500 group-hover:border-indigo-500">

              <iframe
                title="MP Advertisers Location"
                src={embedMap}
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                className="w-full h-full grayscale group-hover:grayscale-0 transition duration-700"
              ></iframe>

              {/* Overlay */}
            
            </div>
          </a>
        </motion.div>

      </div>
    </section>
  );
}