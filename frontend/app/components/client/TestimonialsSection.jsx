"use client";

import { useEffect, useState } from "react";
import Api from "../../lib/api";
import { Star, BadgeCheck, Plus, ChevronLeft, ChevronRight } from "lucide-react";
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
      const res = await Api.get("/testimonials/get");
      setTestimonials(res.data.testimonials || []);
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

  const TestimonialCard = ({ item }) => (
    <div className="min-w-[340px] max-w-[340px] p-8 rounded-2xl 
      bg-white/5 border border-white/10 
      hover:border-indigo-500 transition-all duration-300 
      backdrop-blur-sm mr-6">

      <div className="flex mb-4 text-yellow-400">
        {[...Array(item.rating || 5)].map((_, i) => (
          <Star key={i} size={18} fill="currentColor" />
        ))}
      </div>

      <p className="text-gray-300 mb-6 leading-relaxed text-sm">
        “{item.text}”
      </p>

      <div className="border-t border-white/10 pt-4 mt-4"></div>

      <div className="flex items-center justify-between mt-4">
        <div>
          <h4 className="font-semibold text-indigo-500 flex items-center gap-2">
            {item.name}
            <BadgeCheck size={16} className="text-green-400" />
          </h4>
          <p className="text-xs text-gray-400">
            {item.role} • {item.company}
          </p>
        </div>

        <div className="text-right text-xs text-gray-500">
          <p>{item.project}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 px-4 bg-black text-white relative overflow-hidden">

      {/* HEADER WITH DESKTOP ADD BUTTON */}
      <div className="flex items-center justify-between max-w-6xl mx-auto mb-12">

        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-3">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 text-base">
            Trusted by businesses across India.
          </p>
        </div>

        {/* DESKTOP ADD BUTTON */}
        <Link
          href="/add-testimonial"
          className="hidden lg:inline-flex items-center gap-2 
          px-6 py-3 bg-indigo-600 hover:bg-indigo-500 
          transition rounded-full text-sm font-medium"
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
            bg-indigo-600 hover:bg-indigo-500 
            transition rounded-full text-sm"
          >
            <Plus size={16} />
            Add
          </Link>
        </div>

        {testimonials.length > 0 && (
          <div className="relative">

            <TestimonialCard item={testimonials[currentIndex]} />

            {/* Counter */}
            <div className="text-center text-sm text-gray-400 mt-4">
              {currentIndex + 1} / {testimonials.length}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prev}
              className="absolute -left-3 top-1/2 -translate-y-1/2 
              w-9 h-9 rounded-full bg-white/10 
              backdrop-blur-md flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={next}
              className="absolute -right-3 top-1/2 -translate-y-1/2 
              w-9 h-9 rounded-full bg-white/10 
              backdrop-blur-md flex items-center justify-center"
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
