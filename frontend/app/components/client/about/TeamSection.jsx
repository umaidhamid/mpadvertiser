"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Api from "../../../lib/api";

export default function TeamSection() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await Api.get("/team/get");
      setTeam(res.data.members);
    };

    fetchTeam();
  }, []);

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-background text-foreground">

      {/* Soft Accent Glow */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* ================= HEADING ================= */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-semibold mb-6">
            Our Team
          </h2>

          <p className="text-muted max-w-3xl mx-auto">
            A dedicated team committed to delivering measurable results.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {team.map((member, i) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-3xl 
              bg-card border border-border 
              hover:-translate-y-2 hover:shadow-lg
              transition duration-500 text-center"
            >
              {/* IMAGE */}
              <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-6 border border-border">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* NAME */}
              <h4 className="text-xl font-semibold mb-2">
                {member.name}
              </h4>

              {/* ROLE */}
              <p className="text-primary text-sm mb-4">
                {member.role}
              </p>

              {/* BIO */}
              {member.bio && (
                <p className="text-muted text-sm">
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
