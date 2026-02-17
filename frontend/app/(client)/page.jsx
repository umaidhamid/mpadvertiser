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
    <main className="bg-white text-black overflow-x-hidden">

      {/* 1️⃣ HERO – Big Promise + Clear CTA */}
      <HeroSection />

    
      <ServicesSection />

    
      <WhyChooseUsSection />

      <HomeProductsSection />
      <Carousel />

     
      <TestimonialsSection />

    
      <OfferBanner />

      
      <ProcessSection />
      <StatsSection />
      <MidCTASection />
      <FeaturedClientsSection />
     
      <CTASection />

    </main>

  );
}
