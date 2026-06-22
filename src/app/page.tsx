import dynamic from "next/dynamic";
import Hero from "../components/sections/Hero";
import LazySection from "../components/shared/LazySection";

// Dynamic imports for below-the-fold components to optimize Performance/TBT
const CoreStack = dynamic(() => import("../components/sections/CoreStack"));
const FeaturedProjects = dynamic(() => import("../components/sections/FeaturedProjects"));
const ProfessionalEvolution = dynamic(() => import("../components/sections/ProfessionalEvolution"));

// Non-SEO-critical interactive components: load lazily
const RecruiterAssistant = dynamic(() => import("../components/sections/RecruiterAssistant"));
const ContactSection = dynamic(() => import("../components/sections/ContactSection"));

export default function Home() {
  return (
    <>
      {/* Cinematic splash greeting */}
      <Hero />

      {/* Dynamic skills category dashboard */}
      <CoreStack />

      {/* Beautiful high fidelity layout screenshots */}
      <FeaturedProjects />

      {/* Glowing vertical experience timeline nodes */}
      <ProfessionalEvolution />

      {/* Gemini assistant chat module */}
      <LazySection height="500px">
        <RecruiterAssistant />
      </LazySection>

      {/* Contact inquiry card list */}
      <LazySection height="400px">
        <ContactSection />
      </LazySection>
    </>
  );
}
