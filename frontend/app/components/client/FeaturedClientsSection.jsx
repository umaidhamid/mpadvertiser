"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Api from "../../lib/api";

export default function FeaturedClientsSection() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await Api.get("/clients/get");
      setClients(res.data.clients);
    };

    fetchClients();
  }, []);

  return (
    <section className="relative py-16 text-white overflow-hidden">

      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Trusted by Leading Brands
        </h2>
        <p className="text-gray-400 mt-4">
          Businesses across industries rely on our expertise.
        </p>
      </div>

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
              className="transition duration-300 hover:scale-105"
            >
              <img
                src={client.url}
                alt={client.name}
                className="h-20 md:h-24 object-contain"
              />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
