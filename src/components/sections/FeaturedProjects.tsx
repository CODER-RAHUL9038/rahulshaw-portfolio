import { useState } from "react";
import { projects } from "../../data/projects";
import { Github, ExternalLink, ArrowUpRight, RotateCcw, CheckCircle2, Trophy, Lightbulb, Rocket } from "lucide-react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  variants: Variants;
}

function ProjectCard({ project, variants }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-2000 h-[480px] w-full group">
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full cursor-pointer"
        onClick={() => !isFlipped && setIsFlipped(true)}
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden glass-card rounded-[2.5rem] overflow-hidden flex flex-col transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)]"
        >
          {/* Image Frame */}
          <div className="relative aspect-[16/10] overflow-hidden border-b border-brand-border bg-[#0a0a0a]">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

            {/* Status Badge */}
            {project.status && (
              <div className="absolute top-6 right-6">
                <div className="px-3 py-1 rounded-full text-[9px] font-bold font-mono tracking-widest uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <motion.span 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-blue-500"
                  />
                  {project.status}
                </div>
              </div>
            )}

            {/* Tech Tags */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              {project.tech.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono tracking-widest uppercase bg-black/50 border border-white/10 text-white/90 backdrop-blur-md"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div className="p-7 flex flex-col justify-between flex-grow space-y-4">
            <div className="space-y-3">
              <h3 className="font-heading text-2xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-[#9ca3af] leading-relaxed text-[14px] line-clamp-3 font-sans">
                {project.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
              <button 
                className="group/btn flex items-center gap-2 text-white font-bold text-[11px] uppercase tracking-widest transition-all hover:text-blue-400"
              >
                View Details
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </button>
              
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#9ca3af] hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#9ca3af] hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden glass-card rounded-[2.5rem] overflow-hidden flex flex-col bg-[#08090a]/98 border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.15)]"
          style={{ transform: "rotateY(180deg)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Pulse Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse"></div>

          <div className="flex flex-col h-full p-8 relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Deep Dive</div>
                <h3 className="font-heading text-2xl font-extrabold text-white tracking-tight">
                  Project Insights
                </h3>
              </div>
              <button 
                onClick={() => setIsFlipped(false)}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#9ca3af] hover:text-white hover:bg-blue-600/20 hover:border-blue-500/40 transition-all active:scale-90"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto pr-3 scrollbar-thin space-y-8 pb-4">
              {/* Overview Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400">
                  <Rocket className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">Overview</span>
                </div>
                <p className="text-[13px] text-[#e5e2e1] leading-relaxed font-sans">
                  {project.overview || project.description}
                </p>
              </div>

              {/* Features Section */}
              {project.features && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Key Features</span>
                  </div>
                  <ul className="grid grid-cols-1 gap-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="text-[12px] text-[#9ca3af] flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges & Learnings Grid */}
              <div className="grid grid-cols-1 gap-6">
                {project.challenges && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Trophy className="w-4 h-4" />
                      <span className="text-[11px] font-bold uppercase tracking-widest">Challenges</span>
                    </div>
                    <p className="text-[12px] text-[#9ca3af] leading-relaxed font-sans">
                      {project.challenges}
                    </p>
                  </div>
                )}
                {project.learnings && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-blue-400">
                      <Lightbulb className="w-4 h-4" />
                      <span className="text-[11px] font-bold uppercase tracking-widest">Key Learnings</span>
                    </div>
                    <p className="text-[12px] text-[#9ca3af] leading-relaxed font-sans">
                      {project.learnings}
                    </p>
                  </div>
                )}
              </div>

              {/* Tech Stack Pills (Back side) */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <span className="text-[10px] font-bold text-[#4b5563] uppercase tracking-widest block">Standard Toolkit</span>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg text-[9px] font-mono font-medium bg-white/5 border border-white/5 text-[#9ca3af] hover:text-blue-300 hover:border-blue-500/30 transition-all cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                >
                  <Github className="w-4.5 h-4.5" />
                  Source
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 shadow-[0_10px_25px_rgba(59,130,246,0.3)] transition-all active:scale-95"
                >
                  <ExternalLink className="w-4.5 h-4.5" />
                  Live
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function FeaturedProjects() {
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
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="projects" className="pt-16 pb-28 px-6 max-w-7xl mx-auto relative">
      {/* Background neon dust glow */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        variants={containerVariants}
        className="space-y-16"
      >
        {/* Section Header */}
        <motion.div variants={textRevealVariants} className="space-y-4 max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-blue-500 font-sans">
            Curated Showcases
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-[#9ca3af] leading-relaxed text-base">
            Exploring the bounds of robust backend systems, advanced state machine coordination, and sleek user experiences.
          </p>
        </motion.div>

        {/* Project display index cards */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              variants={textRevealVariants} 
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
