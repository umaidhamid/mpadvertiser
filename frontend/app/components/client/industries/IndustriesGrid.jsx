"use client";

import IndustryCard from "./IndustryCard";

export default function IndustriesGrid() {
  const industries = [
    {
      title: "Agriculture",
      image: "/industries/agriculture.webp",
      description:
        "Farm branding, equipment decals, agricultural event banners and rural advertising solutions.",
    },
    {
      title: "Automotive",
      image: "/industries/AUTOMETIVE.webp",
      description:
        "Car showroom branding, vehicle graphics, workshop boards and promotional displays.",
    },
    {
      title: "Construction",
      image: "/industries/CONSTRUCTION.webp",
      description:
        "Site hoardings, safety signage, project branding and real estate display boards.",
    },
    {
      title: "Council Government",
      image: "/industries/COUNCEL GOVERNMENT.webp",
      description:
        "Public awareness campaigns, official signage, civic boards and institutional branding.",
    },
    {
      title: "Education",
      image: "/industries/Education.webp",
      description:
        "School banners, admission campaigns, campus branding and institutional signage.",
    },
    {
      title: "Event Management",
      image: "/industries/EVENT NMANAGEMENT.webp",
      description:
        "Stage backdrops, event branding, standees, welcome boards and promotional materials.",
    },
    {
      title: "Food & Beverages",
      image: "/industries/FOOD AND BEVRAGES.webp",
      description:
        "Restaurant menu boards, storefront branding, promotional posters and packaging prints.",
    },
    {
      title: "Health Care",
      image: "/industries/HEALTH CARE.webp",
      description:
        "Clinic boards, hospital signage, awareness campaign materials and medical branding.",
    },
    {
      title: "Home Builders",
      image: "/industries/HOME BUILDERS.webp",
      description:
        "Property branding, project site displays, real estate hoardings and marketing materials.",
    },
    {
      title: "Manufacturing",
      image: "/industries/MANUFACTURING.webp",
      description:
        "Industrial signage, factory branding, safety boards and large-scale print solutions.",
    },
    {
      title: "MINING",
      image: "/industries/MINING.webp",
      description:
        "Heavy-duty safety signage, site boards and durable outdoor branding solutions.",
    },
    {
      title: "Personal Care",
      image: "/industries/PERSONAL CARE.webp",
      description:
        "Salon branding, cosmetic promotions, retail displays and product launch materials.",
    },
    {
      title: "Retail",
      image: "/industries/RETAIL.webp",
      description:
        "Shop boards, window graphics, in-store branding and promotional campaign prints.",
    },
    {
      title: "Waste",
      image: "/industries/WASE MANAGEMENT.webp",
      description:
        "Environmental awareness signage, municipal boards and sustainability campaign materials.",
    },
    {
      title: "Wholesale",
      image: "/industries/WHOLESALE TRADE.webp",
      description:
        "Warehouse branding, bulk promotional materials and large-format advertising prints.",
    },
  ];


  return (
    <section className="py-28 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, index) => (
          <IndustryCard key={index} industry={industry} />
        ))}
      </div>
    </section>
  );
}
