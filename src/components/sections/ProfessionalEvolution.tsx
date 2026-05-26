import React from "react";
import { experiences } from "../../data/experience";
import { Briefcase, MapPin, Milestone, Award, Star, GraduationCap } from "lucide-react";
import { motion, useScroll, useSpring, Variants } from "motion/react";

export default function ProfessionalEvolution() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    damping: 30,
    restDelta: 0.001
  });

  const textRevealVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const getIcon = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes("nxerra")) return <Briefcase className="w-4 h-4 text-blue-400" />;
    if (r.includes("freelance")) return <Star className="w-4 h-4 text-amber-400" />;
    if (r.includes("apna college") || r.includes("upskilling")) return <GraduationCap className="w-4 h-4 text-cyan-400" />;
    if (r.includes("amazon")) return <Milestone className="w-4 h-4 text-orange-400" />;
    return <Award className="w-4 h-4 text-indigo-400" />;
  };

  return (
    <section id="experience" className="pt-16 pb-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/[0.02] blur-[160px] rounded-full pointer-events-none"></div>

      <div className="space-y-20">
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          className="text-center space-y-3"
        >
          <motion.h2 
            variants={textRevealVariants}
            className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Professional Evolution
          </motion.h2>
          <motion.p 
            variants={textRevealVariants}
            className="text-[#9ca3af] leading-relaxed text-sm md:text-base max-w-xl mx-auto font-sans"
          >
            Technical milestones and engineering growth.
          </motion.p>
        </motion.div>

        {/* Alternate Timelines Frame */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main vertical center timeline connector line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/5 overflow-hidden">
             <motion.div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 origin-top h-full"
                style={{ scaleY }}
             />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isHighlighted = exp.highlighted;
              return (
                <motion.div
                  key={exp.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: "some" }}
                  variants={textRevealVariants}
                  className={`relative flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-start md:items-center gap-0 md:gap-12 w-full ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Left Side Container (Displays card on even, empty block on odd) */}
                  <div className={`w-full pl-16 md:pl-0 order-2 md:order-1 ${isEven ? "md:text-right md:flex md:justify-end" : "hidden md:block"}`}>
                    {isEven && (
                      <div className={`w-full max-w-[520px] text-left glass-card p-6 md:p-7 rounded-3xl border transition-all duration-300 shadow-xl ${
                        isHighlighted 
                          ? "border-blue-500/40 bg-[#0e1115]/90 shadow-[0_8px_30px_rgba(59,130,246,0.12)] ring-1 ring-blue-500/20" 
                          : "border-white/[0.04] bg-[#0c0d0e]/60 hover:border-blue-500/25"
                      }`}>
                        <div className="flex flex-col gap-2.5">
                          <div className={`w-max px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase border ${
                            isHighlighted 
                              ? "bg-blue-500/20 text-blue-300 border-blue-500/35"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/15"
                          }`}>
                            {exp.year}
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="shrink-0">{getIcon(exp.role)}</span>
                            <h3 className="font-heading text-base md:text-lg font-bold text-white tracking-tight leading-tight">
                              {exp.role}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400/90 font-mono tracking-wide uppercase">
                            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span>{exp.company}</span>
                          </div>

                          <p className="text-xs md:text-[13px] text-[#9ca3af] leading-relaxed mt-1">
                            {exp.description}
                          </p>

                          {exp.details && exp.details.length > 0 && (
                            <ul className="mt-3.5 space-y-2 pt-3.5 border-t border-white/[0.03]">
                              {exp.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-[#9ca3af] leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Central Node Dot placement */}
                  <div className="absolute left-[25px] md:relative md:left-0 md:translate-x-0 order-1 md:order-2 z-10 flex items-center justify-center">
                    <div className={`w-[14px] h-[14px] rounded-full bg-[#050505] border-[3px] hover:scale-125 transition-transform duration-300 ${
                      isHighlighted 
                        ? "border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.9)]" 
                        : "border-blue-500/65 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                    }`}></div>
                  </div>

                  {/* Right Side Container (Displays card on odd, empty block on even) */}
                  <div className={`w-full pl-16 md:pl-0 order-3 ${!isEven ? "md:text-left md:flex md:justify-start" : "hidden md:block"}`}>
                    {!isEven && (
                      <div className={`w-full max-w-[520px] text-left glass-card p-6 md:p-7 rounded-3xl border transition-all duration-300 shadow-xl ${
                        isHighlighted 
                          ? "border-blue-500/40 bg-[#0e1115]/90 shadow-[0_8px_30px_rgba(59,130,246,0.12)] ring-1 ring-blue-500/20" 
                          : "border-white/[0.04] bg-[#0c0d0e]/60 hover:border-blue-500/25"
                      }`}>
                        <div className="flex flex-col gap-2.5">
                          <div className={`w-max px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase border ${
                            isHighlighted 
                              ? "bg-blue-500/20 text-blue-300 border-blue-500/35"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/15"
                          }`}>
                            {exp.year}
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="shrink-0">{getIcon(exp.role)}</span>
                            <h3 className="font-heading text-base md:text-lg font-bold text-white tracking-tight leading-tight">
                              {exp.role}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400/90 font-mono tracking-wide uppercase">
                            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span>{exp.company}</span>
                          </div>

                          <p className="text-xs md:text-[13px] text-[#9ca3af] leading-relaxed mt-1">
                            {exp.description}
                          </p>

                          {exp.details && exp.details.length > 0 && (
                            <ul className="mt-3.5 space-y-2 pt-3.5 border-t border-white/[0.03]">
                              {exp.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-[#9ca3af] leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
