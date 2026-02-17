"use client";

import { useEffect, useState } from "react";
import Api from "../../lib/api";
import {
  Star,
  BadgeCheck,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "../lightswind/ThreeDScrollTrigger";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await Api.get("/testimonials/get");
        setTestimonials(res.data.testimonials || []);
      } catch (err) {
        console.error("Testimonials fetch error:", err);
      }
    };
    fetchTestimonials();
  }, []);

  const next = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  /* ================= CARD ================= */

  const TestimonialCard = ({ item }) => (
    <div
      className="min-w-[340px] max-w-[340px] p-8 rounded-2xl
      bg-card border border-border
      hover:border-primary transition-all duration-300
      mr-6"
    >
      {/* Rating */}
      <div className="flex mb-4 text-yellow-500">
        {[...Array(item.rating || 5)].map((_, i) => (
          <Star key={i} size={18} fill="currentColor" />
        ))}
      </div>

      {/* Text */}
      <p className="text-muted mb-6 leading-relaxed text-sm">
        “{item.text}”
      </p>

      <div className="border-t border-border pt-4 mt-4" />

      {/* Author */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            {item.name}
            <BadgeCheck size={16} className="text-green-500" />
          </h4>
          <p className="text-xs text-muted">
            {item.role} • {item.company}
          </p>
        </div>

        <div className="text-right text-xs text-muted">
          <p>{item.project}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 px-4 bg-background text-foreground relative overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between max-w-6xl mx-auto mb-12">

        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-3">
            What Our Clients Say
          </h2>
          <p className="text-muted text-base">
            Trusted by businesses across India.
          </p>
        </div>

        {/* Desktop Add Button */}
        <Link
          href="/add-testimonial"
          className="hidden lg:inline-flex items-center gap-2
          px-6 py-3 bg-primary text-primary-foreground
          hover:opacity-90 transition rounded-full text-sm font-medium"
        >
          <Plus size={16} />
          Add Testimonial
        </Link>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden max-w-md mx-auto relative">

        {/* Mobile Add Button */}
        <div className="mb-6 text-center">
          <Link
            href="/add-testimonial"
            className="inline-flex items-center gap-2 px-5 py-2
            bg-primary text-primary-foreground
            hover:opacity-90 transition rounded-full text-sm"
          >
            <Plus size={16} />
            Add
          </Link>
        </div>

        {testimonials.length > 0 && (
          <div className="relative">

            <TestimonialCard item={testimonials[currentIndex]} />

            {/* Counter */}
            <div className="text-center text-sm text-muted mt-4">
              {currentIndex + 1} / {testimonials.length}
            </div>

            {/* Navigation */}
            <button
              onClick={prev}
              className="absolute -left-3 top-1/2 -translate-y-1/2
              w-9 h-9 rounded-full bg-card border border-border
              flex items-center justify-center hover:bg-primary
              hover:text-primary-foreground transition"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={next}
              className="absolute -right-3 top-1/2 -translate-y-1/2
              w-9 h-9 rounded-full bg-card border border-border
              flex items-center justify-center hover:bg-primary
              hover:text-primary-foreground transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block mt-12">

        <ThreeDScrollTriggerContainer>
          <ThreeDScrollTriggerRow baseVelocity={4} direction={-1}>
            {testimonials.map((item, index) => (
              <TestimonialCard key={index} item={item} />
            ))}
          </ThreeDScrollTriggerRow>
        </ThreeDScrollTriggerContainer>

      </div>

    </section>
  );
}
