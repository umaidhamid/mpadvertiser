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

    const ownerNumber = "919149455296";
    const message = `📩 New Contact Enquiry

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || "-"}
Service: ${form.service || "-"}

Message:
${form.message || "-"}`;

    const whatsappUrl = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    setLoading(false);
    setSuccess(true);
    setForm({
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-card border border-border p-10 rounded-3xl space-y-6 shadow-lg"
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
        bg-primary text-primary-foreground
        hover:opacity-90 transition"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {success && (
        <p className="text-green-500 text-center">
          Opening WhatsApp to send your message to our team!
        </p>
      )}
    </motion.form>
  );
}
