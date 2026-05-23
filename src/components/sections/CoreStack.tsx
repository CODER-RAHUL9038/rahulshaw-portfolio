import React, { useState, useRef, useEffect } from "react";
import { skills } from "../../data/skills";
import { Atom, Globe, Cpu, Terminal, Database, Lock, GitBranch, Wind, Code, Sparkles, MessageSquareCode, Network, Layers, Zap, GitFork, Container, Radio, Check } from "lucide-react";
import { motion, Variants } from "motion/react";

export default function CoreStack() {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const directoryRef = useRef<HTMLDivElement>(null);

  const categories = ["ALL", "BACKEND", "FRONTEND", "AI WORKFLOWS", "DATABASES", "TOOLS"];

  const filteredSkills = skills.filter((skill) => {
    if (activeTab === "ALL") return true;
    return skill.category === activeTab;
  });

  // Handle scroll to top of directory when tab changes
  useEffect(() => {
    if (directoryRef.current) {
      const topOffset = directoryRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  }, [activeTab]);

  const renderIcon = (id: string, className = "w-5 h-5 text-blue-400") => {
    switch (id) {
      case "reactjs":
      case "react":
        return <Atom className={className} />;
      case "nextjs":
        return <Globe className={className} />;
      case "nodejs":
        return <Cpu className={className} />;
      case "expressjs":
      case "express":
        return <Terminal className={className} />;
      case "mongodb":
        return <Database className={className} />;
      case "rest-jwt":
        return <Lock className={className} />;
      case "graphql":
        return <GitBranch className={className} />;
      case "tailwind":
        return <Wind className={className} />;
      case "typescript":
        return <Code className={className} />;
      case "gemini-api":
        return <Sparkles className={className} />;
      case "claude-api":
        return <Cpu className={className} />;
      case "prompt-eng":
        return <MessageSquareCode className={className} />;
      case "agentic-workflows":
        return <Network className={className} />;
      case "postgresql":
        return <Layers className={className} />;
      case "redis":
        return <Zap className={className} />;
      case "git-github":
        return <GitFork className={className} />;
      case "docker":
        return <Container className={className} />;
      case "vite":
        return <Zap className={className} />;
      case "postman":
        return <Radio className={className} />;
      default:
        return <Code className={className} />;
    }
  };

  const topPillars = [
    {
      id: "react",
      name: "React.js",
      subtitle: "Interactive Component Views",
      icon: <Atom className="w-6 h-6 text-blue-400" />
    },
    {
      id: "nextjs",
      name: "Next.js 15",
      subtitle: "Server Actions & Router Layouts",
      icon: <Globe className="w-6 h-6 text-blue-400" />
    },
    {
      id: "nodejs",
      name: "Node.js",
      subtitle: "Async Non-blocking Engine",
      icon: <Cpu className="w-6 h-6 text-blue-500" />
    },
    {
      id: "express",
      name: "Express.js",
      subtitle: "Secure API Server Framework",
      icon: <Terminal className="w-6 h-6 text-blue-400" />
    },
    {
      id: "mongodb",
      name: "MongoDB",
      subtitle: "NoSQL Flexible Data Store",
      icon: <Database className="w-6 h-6 text-blue-500" />
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

  return (
    <section id="stack" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.02] blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        className="space-y-16 relative z-10"
      >
        {/* Section Header */}
        <div className="space-y-3">
          <motion.h2 
            variants={textRevealVariants}
            className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Core Stack
          </motion.h2>
          <motion.p 
            variants={textRevealVariants}
            className="text-[#9ca3af] leading-relaxed text-sm md:text-base max-w-2xl font-sans"
          >
            Standard engineering toolkit for robust, production-grade applications.
          </motion.p>
        </div>

        {/* Dynamic upper grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {topPillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              variants={textRevealVariants}
              transition={{ delay: idx * 0.1 }}
              className="py-12 px-6 rounded-3xl border border-white/[0.04] bg-[#0c0d0e]/60 backdrop-blur-md flex flex-col items-center text-center justify-center space-y-5 hover:border-blue-500/20 hover:bg-[#111214]/80 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/5 border border-blue-500/15 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all shadow-[0_0_15px_rgba(59,130,246,0.05)]">
                {pillar.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-lg font-bold text-white tracking-tight leading-tight">
                  {pillar.name}
                </h3>
                <p className="text-[11px] text-[#9ca3af] max-w-[130px] mx-auto leading-relaxed">
                  {pillar.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Directory Wrapper Panel */}
        <motion.div 
          ref={directoryRef}
          variants={textRevealVariants}
          className="rounded-[2.5rem] border border-white/[0.05] bg-[#090a0b]/80 p-8 md:p-12 space-y-10 shadow-[0_30px_70px_rgba(0,0,0,0.4)] relative"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 rounded-2xl bg-[#0e1012]/40 border border-white/[0.04] flex items-center gap-3.5 hover:border-blue-500/25 hover:bg-[#131518]/70 transition-all duration-300 group"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-950/40 border border-blue-500/25 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-blue-400 font-extrabold stroke-[3.5]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white tracking-tight truncate leading-tight">
                    {skill.name}
                  </h4>
                  <span className="text-[9px] font-mono font-medium text-[#9ca3af] uppercase tracking-wider block mt-0.5">
                    {skill.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
