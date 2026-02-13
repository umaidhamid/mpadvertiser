"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ContactInput from "./ContactInput";
import ContactSelect from "./ContactSelect";
import ContactTextarea from "./ContactTextarea";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const services = [
    "Flex & Banner Printing",
    "Visiting Cards",
    "Poster Printing",
    "Outdoor Advertising",
    "Brand Identity Design",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl space-y-6"
    >
      <ContactInput
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <ContactInput
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <ContactInput
        name="email"
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
      />

      <ContactSelect
        name="service"
        value={form.service}
        onChange={handleChange}
        options={services}
      />

      <ContactTextarea
        name="message"
        value={form.message}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl font-semibold 
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
        hover:opacity-90 transition"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {success && (
        <p className="text-green-400 text-center">
          Message sent successfully!
        </p>
      )}
    </motion.form>
  );
}
