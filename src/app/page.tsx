"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import CoreStack from "../components/sections/CoreStack";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import ProfessionalEvolution from "../components/sections/ProfessionalEvolution";
import RecruiterAssistant from "../components/sections/RecruiterAssistant";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/layout/Footer";

export default function Home() {
  useEffect(() => {
    // Reset scroll to top on refresh/load
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-[#e5e2e1] antialiased selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      {/* 1. Transparent floating header */}
      <Navbar />

      {/* 2. Main content tracks */}
      <main id="main-content">
        {/* Cinematic splash greeting */}
        <Hero />

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
    </div>
  );
}
