import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CoreStack from "./components/CoreStack";
import FeaturedProjects from "./components/FeaturedProjects";
import ProfessionalEvolution from "./components/ProfessionalEvolution";
import RecruiterAssistant from "./components/RecruiterAssistant";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1] flex flex-col font-sans selection:bg-blue-600/30 selection:text-white" id="root-div">
      
      {/* Premium Header Navigation bar */}
      <Navbar />

      {/* Main layout wrapper */}
      <main className="flex-1 relative">
        {/* Absolute ambient lights behind components to secure cinema effect */}
        <div className="absolute top-[8%] left-[10%] w-[35%] aspect-square rounded-full bg-blue-600/5 blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute top-[35%] right-[12%] w-[35%] aspect-square rounded-full bg-indigo-500/3 blur-[140px] pointer-events-none z-0"></div>
        <div className="absolute top-[65%] left-[8%] w-[40%] aspect-square rounded-full bg-blue-500/4 blur-[130px] pointer-events-none z-0"></div>
        <div className="absolute top-[85%] right-[15%] w-[35%] aspect-square rounded-full bg-indigo-600/3 blur-[120px] pointer-events-none z-0"></div>

        {/* Content sections stacked with proper indexing */}
        <div className="relative z-10 space-y-16">
          <Hero />
          <FeaturedProjects />
          <CoreStack />
          <ProfessionalEvolution />
          <RecruiterAssistant />
          <ContactForm />
        </div>
      </main>

      {/* Deep dark Footer brand */}
      <Footer />

    </div>
  );
}
