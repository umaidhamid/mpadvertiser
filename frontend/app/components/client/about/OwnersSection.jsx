"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";

export default function OwnersSection({ owners }) {
  return (
    <section className="relative py-12 px-6 overflow-hidden bg-background text-foreground">

      {/* Soft Accent Glow */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      <div className="absolute -top-20 right-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">

        {/* ================= HEADING ================= */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
            Leadership
          </h2>

          <p className="text-muted max-w-2xl mx-auto">
            Visionary leadership driving innovation, growth, and long-term impact.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid lg:grid-cols-2 gap-10">

          {owners.map((owner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-10 rounded-3xl 
              bg-card border border-border 
              transition duration-500
              hover:border-primary hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-10">

                {/* IMAGE */}
                <div className="relative w-40 h-40 rounded-full overflow-hidden border border-border shrink-0">
                  <Image
                    src={owner.image}
                    alt={owner.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="text-center md:text-left">

                  <h4 className="text-2xl font-semibold mb-2">
                    {owner.name}
                  </h4>

                  <p className="text-primary mb-4">
                    {owner.role}
                  </p>

                  {/* Experience */}
                  {owner.experience && (
                    <div className="text-sm text-muted mb-4">
                      {owner.experience}
                    </div>
                  )}

                  {/* Bio */}
                  <p className="text-muted text-sm leading-relaxed mb-6">
                    {owner.bio}
                  </p>

                  {/* Expertise Tags */}
                  {owner.expertise && (
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                      {owner.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-1 text-xs rounded-full 
                          bg-background border border-border text-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="flex gap-4 justify-center md:justify-start">

                    {owner.social?.linkedin && (
                      <a
                        href={owner.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center 
                        rounded-full bg-card border border-border 
                        text-foreground
                        hover:bg-primary hover:text-primary-foreground
                        transition duration-300"
                      >
                        <Linkedin size={16} />
                      </a>
                    )}

                    {owner.social?.email && (
                      <a
                        href={owner.social.email}
                        className="w-9 h-9 flex items-center justify-center 
                        rounded-full bg-card border border-border 
                        text-foreground
                        hover:bg-primary hover:text-primary-foreground
                        transition duration-300"
                      >
                        <Mail size={16} />
                      </a>
                    )}

                  </div>

                </div>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
