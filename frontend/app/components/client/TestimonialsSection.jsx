"use client";
import { useEffect, useState } from "react";
import Api from "../../lib/api";
import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";

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

            {/* Divider */}
            <div className="border-t border-white/10 pt-4 mt-4"></div>

            {/* Client Info */}
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
