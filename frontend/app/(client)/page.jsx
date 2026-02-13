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

      {/* 1️⃣ Hero – Hook */}
      <HeroSection />

      {/* 2️⃣ Limited Offer – Urgency */}
      <OfferBanner />

      {/* 3️⃣ Stats – Instant Trust */}
      <StatsSection />

      {/* 4️⃣ Why Choose Us – Authority */}


      <HomeProductsSection />
      {/* 5️⃣ Services – What You Do */}
      <ServicesSection />

      {/* 6️⃣ Process – How You Work */}
      <ProcessSection />

      <WhyChooseUsSection />
      {/* 7️⃣ Mid CTA – Momentum Push */}
      <MidCTASection />

      {/* 8️⃣ Featured Products – What You Sell */}

      {/* 9️⃣ Featured Clients – Social Proof */}
      <FeaturedClientsSection />

      {/* 🔟 Work Showcase – Visual Proof */}
      <Carousel />

      {/* 1️⃣1️⃣ Testimonials – Emotional Proof */}
      <TestimonialsSection />

      {/* 1️⃣2️⃣ Vision – Brand Depth */}
      <VisionSection />

      {/* 1️⃣3️⃣ Final CTA – Strong Close */}
      <CTASection />

    </main>
  );
}
