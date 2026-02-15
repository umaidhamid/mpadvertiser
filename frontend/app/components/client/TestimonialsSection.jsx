"use client";
import { useEffect, useState } from "react";
import Api from "../../lib/api";
import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import Link from "next/link";
export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const res = await Api.get("/testimonials/get");
      setTestimonials(res.data.testimonials);
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="py-24 px-6 bg-black text-white relative overflow-hidden">

      {/* Section Heading */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          What Our Clients Say
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Trusted by businesses across India for high-quality printing,
          branding, and outdoor advertising solutions.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* ADD TESTIMONIAL CARD */}
        <Link href="/add-testimonial">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group relative p-8 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/40 hover:border-indigo-400 transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 bg-indigo-500 blur-2xl transition duration-500 rounded-2xl"></div>

            <div className="flex items-center justify-center h-full text-center flex-col gap-4">

              <div className="text-4xl font-bold text-indigo-400">
                +
              </div>

              <h3 className="text-lg font-semibold">
                Share Your Experience
              </h3>

              <p className="text-sm text-gray-300">
                Tell us about your project and how we helped.
              </p>

            </div>
          </motion.div>
        </Link>

        {/* EXISTING TESTIMONIALS */}
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500 transition-all duration-300"
          >
            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-15 bg-indigo-500 blur-2xl transition duration-500 rounded-2xl"></div>

            {/* Stars */}
            <div className="flex mb-4 text-yellow-400">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>

            {/* Text */}
            <p className="text-gray-300 mb-6 leading-relaxed text-sm">
              “{item.text}”
            </p>

            <div className="border-t border-white/10 pt-4 mt-4"></div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <h4 className="font-semibold text-indigo-500 flex items-center gap-2">
                  {item.name}
                  <BadgeCheck size={16} className="text-green-400" />
                </h4>
                <p className="text-xs text-gray-400">
                  {item.role} • {item.company}
                </p>
                <p className="text-xs text-gray-500">
                  {item.location}
                </p>
              </div>

              <div className="text-right text-xs text-gray-500">
                <p>{item.project}</p>
                <p>{item.date}</p>
              </div>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
