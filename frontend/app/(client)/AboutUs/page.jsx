
"use client";

import AboutHero from "../../components/client/about/AboutHero.jsx";
import CompanyStory from "../../components/client/about/CompanyStory.jsx";
import MissionVision from "../../components/client/about/MissionVision.jsx";
import CoreValues from "../../components/client/about/CoreValues.jsx";
import OwnersSection from "../../components/client/about/OwnersSection.jsx";
import TeamSection from "../../components/client/about/TeamSection.jsx";
import AchievementsSection from "../../components/client/about/AchievementsSection.jsx";
import ClientLogosSection from "../../components/client/about/ClientLogosSection.jsx";
import FounderQuoteSection from "../../components/client/about/FounderQuoteSection.jsx";
import AboutCTASection from "../../components/client/about/AboutCTASection.jsx";
import ReasonsSection from "../../components/client/about/7Reason.jsx";
import {
  aboutHero,
  companyStory,
  missionVision,
  coreValues,
  owners,
  teamMembers,
  achievements,
  clients,
} from "../../data/aboutData.js";

export default function AboutPage() {
  return (
    <main className="bg-black text-white overflow-x-hidden">

      {/* Hero */}
      <AboutHero data={aboutHero} />

      {/* Story */}
      <CompanyStory data={companyStory} />

      {/* Mission & Vision */}
      <MissionVision data={missionVision} />

      {/* Core Values */}
      <CoreValues values={coreValues} />

      {/* Achievements */}
      {/* <AchievementsSection achievements={achievements} /> */}

      {/* Client Logos */}
      <ClientLogosSection clients={clients} />

      {/* Leadership */}
      <OwnersSection owners={owners} />

      {/* Founder Quote */}
      <FounderQuoteSection />

      <ReasonsSection />
      {/* Team */}
      <TeamSection team={teamMembers} />

      {/* Final CTA */}
      <AboutCTASection />

      {/* 7 Reasons */}

    </main>
  );
}