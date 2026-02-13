"use client";

import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section className="relative py-28 bg-black text-white overflow-hidden">

      {/* Premium Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 blur-3xl opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">

        <ContactInfo />
        <ContactForm />

      </div>
    </section>
  );
}
