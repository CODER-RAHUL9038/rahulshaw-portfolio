import { EVOLUTION } from "../data";
import { Terminal, MapPin, Briefcase, Award } from "lucide-react";

export default function ProfessionalEvolution() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-24 relative overflow-hidden">
      
      {/* Title Block */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-white">
          Professional Evolution
        </h2>
        <p className="text-gray-400 text-lg">
          Technical milestones and engineering growth.
        </p>
      </div>

      {/* Narrative vertical timeline container */}
      <div className="relative py-8">
        
        {/* Glowing Center Line - Desktop Only */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 timeline-line hidden md:block"></div>

        <div className="space-y-24">
          {EVOLUTION.map((role, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={role.title + role.year}
                className="relative grid md:grid-cols-2 gap-8 items-center animate-fade-in"
              >
                {/* Visual Side node alignment - Desktop Only */}
                {/* Dot Node */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 z-10 hidden md:block rounded-full bg-black transition-all duration-300 ${
                    role.highlighted
                      ? "w-8 h-8 border-4 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                      : "w-5 h-5 border-4 border-blue-500/50 hover:border-blue-500"
                  }`}
                ></div>

                {/* Left Side Content Area */}
                <div
                  className={`order-2 md:order-1 ${
                    isEven ? "md:text-right md:pr-16" : "md:opacity-0 md:pointer-events-none md:select-none"
                  }`}
                >
                  {isEven && (
                    <div
                      className={`glass-card p-8 rounded-[2rem] relative border-white/5 transition-all duration-500 text-left ${
                        role.highlighted
                          ? "bg-blue-950/10 border-blue-500/30 shadow-lg shadow-blue-500/5"
                          : ""
                      }`}
                    >
                      <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full w-fit mb-4 block">
                        {role.year}
                      </span>
                      <h3 className="text-xl font-headline font-extrabold text-white flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-400 shrink-0" />
                        {role.title}
                      </h3>
                      <p className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mt-1 mb-4 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-blue-500/50" />
                        {role.subtitle}
                      </p>
                      <p className="text-sm text-gray-400 leading-relaxed font-sans mt-2">
                        {role.description}
                      </p>
                    </div>
                  )}
                  
                  {/* Empty Spacer fallback node for layout balance check */}
                  {!isEven && (
                    <div className="text-5xl font-headline font-extrabold text-white/5 md:text-right md:pr-16 tracking-tighter select-none">
                      {role.year}
                    </div>
                  )}
                </div>

                {/* Right Side Content Area */}
                <div
                  className={`order-1 md:order-2 ${
                    !isEven ? "md:pl-16" : "md:opacity-0 md:pointer-events-none md:select-none"
                  }`}
                >
                  {!isEven && (
                    <div
                      className={`glass-card p-8 rounded-[2rem] relative border-white/5 transition-all duration-500 text-left ${
                        role.highlighted
                          ? "bg-blue-950/10 border-blue-500/30 shadow-lg shadow-blue-500/5"
                          : ""
                      }`}
                    >
                      <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full w-fit mb-4 block">
                        {role.year}
                      </span>
                      <h3 className="text-xl font-headline font-extrabold text-white flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-400 shrink-0" />
                        {role.title}
                      </h3>
                      <p className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mt-1 mb-4 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-blue-500/50" />
                        {role.subtitle}
                      </p>
                      <p className="text-sm text-gray-400 leading-relaxed font-sans mt-2">
                        {role.description}
                      </p>
                    </div>
                  )}

                  {/* Empty Spacer fallback node for layout balance check */}
                  {isEven && (
                    <div className="text-5xl font-headline font-extrabold text-white/5 md:pl-16 tracking-tighter select-none">
                      {role.year}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Decorative location footer banner */}
      <div className="flex justify-center items-center gap-2 text-xs font-mono text-gray-500 bg-white/[0.01] border border-white/5 py-4 px-6 rounded-full w-fit mx-auto">
        <MapPin className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
        Verified History Logs. Kolkata, West Bengal, India.
      </div>

    </section>
  );
}
