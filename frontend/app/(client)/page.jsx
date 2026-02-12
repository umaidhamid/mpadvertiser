"use client";

import HeroSection from "../components/client/HeroSection";
import StatsSection from "../components/client/StatsSection";
import ServicesSection from "../components/client/ServicesSection";
import Carousel from "../components/client/Carousel";
import TestimonialsSection from "../components/client/TestimonialsSection";
import VisionSection from "../components/client/VisionSection";
import CTASection from "../components/client/CTASection";

export default function HomePage() {
  return (
    <main className="bg-black text-white overflow-x-hidden">

      {/* 1️⃣ Hero Section */}
      <HeroSection />

      {/* 2️⃣ Social Proof Stats */}
      <StatsSection />

      {/* 3️⃣ Services Overview */}
      <ServicesSection />

      {/* 4️⃣ Work Showcase Carousel */}
      <Carousel />

      {/* 5️⃣ Client Testimonials */}
      <TestimonialsSection />

      {/* 6️⃣ Vision / Mission / Purpose */}
      <VisionSection />

      {/* 7️⃣ Final Call To Action */}
      <CTASection />

    </main>
  );
}
