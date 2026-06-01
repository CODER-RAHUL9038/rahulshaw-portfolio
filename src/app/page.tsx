import dynamic from "next/dynamic";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import ScrollRestorer from "../components/shared/ScrollRestorer";

// Dynamic imports for below-the-fold components to optimize Performance/TBT
const CoreStack = dynamic(() => import("../components/sections/CoreStack"));
const FeaturedProjects = dynamic(() => import("../components/sections/FeaturedProjects"));
const ProfessionalEvolution = dynamic(() => import("../components/sections/ProfessionalEvolution"));
const RecruiterAssistant = dynamic(() => import("../components/sections/RecruiterAssistant"));
const ContactSection = dynamic(() => import("../components/sections/ContactSection"));
const Footer = dynamic(() => import("../components/layout/Footer"));

export default function Home() {
  return (
    <div className="bg-[#050505] min-h-screen text-[#e5e2e1] antialiased selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      <ScrollRestorer />
      
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
