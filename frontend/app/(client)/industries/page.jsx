"use client";

import IndustriesHero from "../../components/client/industries/IndustriesHero";
import IndustriesGrid from "../../components/client/industries/IndustriesGrid";
import IndustriesProcess from "../../components/client/industries/IndustriesProcess";
import IndustriesCTA from "../../components/client/industries/IndustriesCTA";

export default function IndustriesPage() {
  return (
    <main className="bg-black text-white">

      <IndustriesHero />

      <IndustriesGrid />

      <IndustriesProcess />

      <IndustriesCTA />

    </main>
  );
}
