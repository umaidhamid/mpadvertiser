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
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-white/[0.02] to-black pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <h2 className="text-4xl font-semibold mb-6">
            Our Team
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            A dedicated team committed to delivering measurable results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, i) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:-translate-y-2 transition text-center"
            >
              <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h4 className="text-xl font-semibold mb-2">
                {member.name}
              </h4>

              <p className="text-indigo-400 text-sm mb-4">
                {member.role}
              </p>

              {member.bio && (
                <p className="text-gray-400 text-sm">
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
