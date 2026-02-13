"use client";

import IndustryCard from "./IndustryCard";

export default function IndustriesGrid() {
  const industries = [
    {
      title: "Retail & Shops",
      description:
        "Shop branding, flex boards, window graphics, and promotional posters.",
      image: "/Slide1.webp",
    },
    {
      title: "Real Estate",
      description:
        "Site branding, project billboards, brochure printing & hoardings.",
      image: "/Slide2.webp",
    },
    {
      title: "Education",
      description:
        "School banners, admission posters, institutional branding.",
      image: "/Slide3.webp",
    },
    {
      title: "Healthcare",
      description:
        "Clinic boards, hospital signage, awareness campaign materials.",
      image: "/Slide4.webp",
    },
    {
      title: "Events & Weddings",
      description:
        "Stage backdrops, welcome boards, standees, event branding.",
      image: "/Slide5.webp",
    },
    {
      title: "Corporate & Startups",
      description:
        "Complete brand identity kits, visiting cards & marketing materials.",
      image: "/Slide1.webp",
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
