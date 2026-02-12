"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TeamSection({ team }) {
  return (
    <section className="relative py-20 px-6 overflow-hidden">

      {/* Background depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-white/[0.02] to-black pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            Our Team
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            A dedicated team of creative thinkers, strategists, and execution experts committed to delivering measurable results.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-3xl 
              bg-white/[0.04] border border-white/10 
              backdrop-blur-xl transition duration-500
              hover:border-indigo-500/40 hover:-translate-y-2 text-center"
            >
              {/* Image */}
              <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-6 border border-white/10">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Name */}
              <h4 className="text-xl font-semibold mb-2">
                {member.name}
              </h4>

              {/* Role */}
              <p className="text-indigo-400 text-sm mb-4">
                {member.role}
              </p>

              {/* Bio (Optional) */}
              {member.bio && (
                <p className="text-gray-400 text-sm leading-relaxed">
                  {member.bio}
                </p>
              )}
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}