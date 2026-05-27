import React, { useState, useRef, useEffect } from "react";
import { skills } from "../../data/skills";
import { Atom, Globe, Cpu, Terminal, Database, Sparkles, Check } from "lucide-react";
import { motion, Variants, AnimatePresence } from "motion/react";

export default function CoreStack() {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [isExpanded, setIsExpanded] = useState(false);
  const directoryRef = useRef<HTMLDivElement>(null);

  const SKILL_LIMIT = 10;
  const categories = ["ALL", "BACKEND", "FRONTEND", "AI WORKFLOWS", "DATABASES", "TOOLS"];

  const filteredSkills = skills.filter((skill) => {
    if (activeTab === "ALL") return true;
    return skill.category === activeTab;
  });

  const displayedSkills = isExpanded ? filteredSkills : filteredSkills.slice(0, SKILL_LIMIT);
  const hasMore = filteredSkills.length > SKILL_LIMIT;

  useEffect(() => {
    setIsExpanded(false);
  }, [activeTab]);

  useEffect(() => {
    if (directoryRef.current && activeTab !== "ALL") {
      const topOffset = directoryRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  }, [activeTab]);

  const topPillars = [
    {
      id: "react",
      name: "React.js",
      subtitle: "UI Logic & Views",
      icon: <Atom className="w-5 h-5" />,
      color: "#61DAFB",
      glow: "rgba(97, 218, 251, 0.15)"
    },
    {
      id: "nextjs",
      name: "Next.js 15",
      subtitle: "Full-Stack System",
      icon: <Globe className="w-5 h-5" />,
      color: "#FFFFFF",
      glow: "rgba(255, 255, 255, 0.1)"
    },
    {
      id: "nodejs",
      name: "Node.js",
      subtitle: "Backend Engine",
      icon: <Cpu className="w-5 h-5" />,
      color: "#339933",
      glow: "rgba(51, 153, 51, 0.15)"
    },
    {
      id: "express",
      name: "Express.js",
      subtitle: "API Middleware",
      icon: <Terminal className="w-5 h-5" />,
      color: "#eeeeee",
      glow: "rgba(238, 238, 238, 0.08)"
    },
    {
      id: "mongodb",
      name: "MongoDB",
      subtitle: "Data Persistence",
      icon: <Database className="w-5 h-5" />,
      color: "#47A248",
      glow: "rgba(71, 162, 72, 0.15)"
    }
  ];

  const textRevealVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="stack" className="pt-16 pb-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.02] blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="space-y-16 relative z-10"
      >
        {/* Section Header */}
        <div className="space-y-3">
          <motion.h2 
            variants={textRevealVariants}
            className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Tech Stack
          </motion.h2>
          <motion.p 
            variants={textRevealVariants}
            className="text-[#9ca3af] leading-relaxed text-sm md:text-base max-w-2xl font-sans"
          >
            Technologies I work with for building scalable web applications, APIs, and responsive user experiences.
          </motion.p>
        </div>

        {/* Dynamic upper grid - Reverted to md:grid-cols-5 and gap-4 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {topPillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              variants={textRevealVariants}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="py-12 px-6 rounded-3xl border border-white/[0.04] bg-[#0c0d0e]/60 backdrop-blur-md flex flex-col items-center text-center justify-center space-y-5 hover:border-blue-500/20 hover:bg-[#111214]/80 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Pillar Glow Effect - Kept as Improvement */}
              <div 
                className="absolute -top-10 -right-10 w-24 h-24 blur-[35px] rounded-full transition-all duration-700 opacity-10 group-hover:opacity-25"
                style={{ backgroundColor: pillar.color }}
              ></div>

              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-transparent transition-all duration-500 shadow-inner"
                   style={{ 
                     color: pillar.color,
                     boxShadow: `0 0 15px -5px ${pillar.glow}`
                   }}
              >
                <div className="transition-transform duration-500 group-hover:scale-110">
                  {pillar.icon}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-lg font-bold text-white tracking-tight leading-tight">
                  {pillar.name}
                </h3>
                <p className="text-[11px] font-mono text-[#6b7280] uppercase tracking-wider group-hover:text-[#9ca3af] transition-colors">
                  {pillar.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Directory Wrapper Panel - Reverted spacing and padding */}
        <motion.div 
          id="skills"
          ref={directoryRef}
          variants={textRevealVariants}
          className="rounded-[2.5rem] border border-white/[0.05] bg-[#090a0b]/80 p-8 md:p-12 space-y-10 shadow-[0_30px_70px_rgba(0,0,0,0.4)] relative backdrop-blur-xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.04]">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-blue-500 text-lg font-bold select-none">&gt;_</span>
                <h3 className="font-heading text-xl font-extrabold text-white tracking-widest uppercase">
                  Expanded Skill-set Directory
                </h3>
              </div>
              <p className="text-xs text-[#9ca3af] font-sans">
                Interactive categorization of engineering tools, frameworks, and workflows.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === category
                      ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                      : "bg-[#131416]/50 border border-white/[0.04] text-[#9ca3af] hover:text-white hover:bg-[#18191c]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            key={`${activeTab}-${isExpanded}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {displayedSkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  layout
                  variants={itemVariants}
                  className="p-4 rounded-2xl bg-[#0e1012]/40 border border-white/[0.04] flex items-center gap-3.5 hover:border-blue-500/25 hover:bg-[#131518]/70 transition-all duration-300 group"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-950/40 border border-blue-500/25 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-blue-400 font-extrabold stroke-[3.5]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-normal text-white tracking-tight truncate leading-tight">
                      {skill.name}
                    </h4>
                    <span className="text-[9px] font-mono font-medium text-[#9ca3af] uppercase tracking-wider block mt-0.5">
                      {skill.category.split(' ')[0]}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Show More / Less Toggle */}
          {hasMore && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group flex items-center gap-2 px-8 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 text-[#9ca3af] hover:text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-lg"
              >
                {isExpanded ? "Show Less" : `Show  More`}
                <motion.span
                  animate={{ y: isExpanded ? -2 : 2 }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror" }}
                  className="font-mono text-blue-400"
                >
                  {isExpanded ? "↑" : "↓"}
                </motion.span>
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
