"use client";

import IndustriesHero from "../../components/client/industries/IndustriesHero";
import IndustriesGrid from "../../components/client/industries/IndustriesGrid";
import IndustriesProcess from "../../components/client/industries/IndustriesProcess";
import IndustriesCTA from "../../components/client/industries/IndustriesCTA";

export default function IndustriesPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">

      <IndustriesHero />
      <IndustriesGrid />
      <IndustriesProcess />
      <IndustriesCTA />

    </main>
  );
}
