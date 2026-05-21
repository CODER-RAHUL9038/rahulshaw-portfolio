"use client";

import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import CoreStack from "../components/sections/CoreStack";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import ProfessionalEvolution from "../components/sections/ProfessionalEvolution";
import RecruiterAssistant from "../components/sections/RecruiterAssistant";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/layout/Footer";
import ResumeModal from "../components/shared/ResumeModal";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="bg-[#050505] min-h-screen text-[#e5e2e1] antialiased selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      {/* 1. Transparent floating header */}
      <Navbar onResumeClick={() => setIsResumeOpen(true)} />

      {/* 2. Main content tracks */}
      <main>
        {/* Cinematic splash greeting */}
        <Hero onResumeClick={() => setIsResumeOpen(true)} />

        {/* Dynamic skills category dashboard */}
        <CoreStack />

        {/* Beautiful high fidelity layout screenshots */}
        <FeaturedProjects />

        {/* Glowing vertical experience timeline nodes */}
        <ProfessionalEvolution />

        {/* Gemini assistant chat module */}
        <RecruiterAssistant />

        {/* Contact inquiry card list */}
        <ContactSection />
      </main>

      {/* 3. Metrics monitoring footer */}
      <Footer />

      {/* 4. A4 print-optimized Resume modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
