"use client";

import HeroSection from "../components/client/HeroSection";
import OfferBanner from "../components/client/OfferBanner";
import StatsSection from "../components/client/StatsSection";
import WhyChooseUsSection from "../components/client/WhyChooseUsSection";
import ServicesSection from "../components/client/ServicesSection";
import ProcessSection from "../components/client/ProcessSection";
import MidCTASection from "../components/client/MidCTASection";
import HomeProductsSection from "../components/client/HomeProductsSection";
import FeaturedClientsSection from "../components/client/FeaturedClientsSection";
import Carousel from "../components/client/Carousel";
import TestimonialsSection from "../components/client/TestimonialsSection";
import VisionSection from "../components/client/VisionSection";
import CTASection from "../components/client/CTASection";

export default function HomePage() {
  return (
    <main className="bg-black text-white overflow-x-hidden">

      {/* 1️⃣ HERO – Big Promise + Clear CTA */}
      <HeroSection />

      {/* 2️⃣ SOCIAL PROOF – Clients logos (instant credibility) */}
      <FeaturedClientsSection />

      {/* 3️⃣ STATS – Authority + Experience */}
      <StatsSection />

      {/* 4️⃣ SERVICES – What You Do Clearly */}
      <ServicesSection />

      {/* 5️⃣ WHY CHOOSE US – Differentiation */}
      <WhyChooseUsSection />

      <HomeProductsSection />
      {/* 6️⃣ PROCESS – Remove Risk */}
      <ProcessSection />

      {/* 7️⃣ PRODUCTS – What They Can Order */}

      {/* 8️⃣ WORK SHOWCASE – Visual Validation */}
      <Carousel />

      {/* 9️⃣ TESTIMONIALS – Emotional Trust */}
      <TestimonialsSection />

      {/* 🔟 OFFER – Urgency near decision point */}
      <OfferBanner />

      {/* 1️⃣1️⃣ MID CTA – Momentum Push */}
      <MidCTASection />

      {/* 1️⃣2️⃣ FINAL CTA – Strong Close */}
      <CTASection />

    </main>

  );
}
