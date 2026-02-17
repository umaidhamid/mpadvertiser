"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Api from "../../lib/api";

export default function FeaturedClientsSection() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await Api.get("/clients/get");
        setClients(res.data.clients || []);
      } catch (err) {
        console.error("Clients fetch error:", err);
      }
    };

    fetchClients();
  }, []);

  return (
    <section className="relative py-20 bg-background text-foreground overflow-hidden">

      {/* ================= HEADING ================= */}
      <div className="text-center mb-14 px-6">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Trusted by Leading Brands
        </h2>

        <p className="text-muted mt-4">
          Businesses across industries rely on our expertise.
        </p>
      </div>

      {/* ================= CLIENT LOGOS ================= */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-12"
        >
          {clients.map((client) => (
            <a
              key={client._id}
              href={client.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="transition duration-300 hover:scale-105
              p-4 rounded-xl bg-card border border-border
              hover:border-primary"
            >
              <img
                src={client.url}
                alt={client.name}
                className="h-20 md:h-24 object-contain 
                grayscale hover:grayscale-0 transition duration-300"
              />
            </a>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
