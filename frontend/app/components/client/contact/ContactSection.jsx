"use client";

import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section className="relative py-28 bg-background text-foreground overflow-hidden">

      {/* Soft Accent Glow */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">

        <ContactInfo />
        <ContactForm />

      </div>
    </section>
  );
}