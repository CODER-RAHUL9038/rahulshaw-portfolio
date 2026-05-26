import { useState } from "react";
import { projects } from "../../data/projects";
import { Github, ExternalLink, ArrowUpRight, RotateCcw, Rocket, CheckCircle2, Trophy, Lightbulb } from "lucide-react";
import { motion, Variants } from "motion/react";
import { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  variants: Variants;
}

function ProjectCard({ project, variants }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-2000 h-[480px] w-full group relative">
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          duration: 0.7, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full cursor-pointer"
        onClick={() => !isFlipped && setIsFlipped(true)}
      >
        {/* FRONT SIDE PANEL */}
        <div 
          className="absolute inset-0 w-full h-full glass-card rounded-[2.5rem] overflow-hidden flex flex-col"
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(1px)" // Separation plane
          }}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent"></div>

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

          {/* Front Content */}
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
                className="text-white hover:text-blue-400 font-bold text-[11px] uppercase flex items-center gap-2 transition-all group/btn"
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

        {/* BACK SIDE PANEL (DETAILS) */}
        <div 
          className="absolute inset-0 w-full h-full rounded-[2.5rem] overflow-hidden flex flex-col bg-[#08090b] border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.2)]"
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Internal Glass Layer (Avoids breaking 3D culling) */}
          <div className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl pointer-events-none"></div>
          
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse"></div>

          <div className="flex flex-col h-full p-8 relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                {project.status && (
                  <div className="px-2.5 py-0.5 rounded-full text-[8px] font-bold font-mono tracking-widest uppercase bg-blue-500/15 border border-blue-500/30 text-blue-400 w-fit flex items-center gap-1.5 mb-1.5">
                    <motion.span 
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                    />
                    {project.status}
                  </div>
                )}
                <h3 className="font-heading text-xl font-extrabold text-white tracking-tight">
                  Case Study
                </h3>
              </div>
              <button 
                onClick={() => setIsFlipped(false)}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#9ca3af] hover:text-white hover:bg-blue-600/20 hover:border-blue-500/40 transition-all active:scale-90"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto pr-3 scrollbar-thin space-y-7 pb-4">
              {/* Data-Driven Content Sections */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={isFlipped ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 }}
                className="space-y-2.5"
              >
                <div className="flex items-center gap-2 text-blue-400">
                  <Rocket className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Overview</span>
                </div>
                <p className="text-[13px] text-[#e5e2e1] leading-relaxed font-sans">
                  {project.overview || project.description}
                </p>
              </motion.div>

              {project.features && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={isFlipped ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Key Features</span>
                  </div>
                  <ul className="grid grid-cols-1 gap-2.5">
                    {project.features.map((feature, i) => (
                      <li key={i} className="text-[12px] text-[#9ca3af] flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-blue-500/50 mt-2 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <div className="grid grid-cols-1 gap-6">
                {project.challenges && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={isFlipped ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.35 }}
                    className="space-y-2.5"
                  >
                    <div className="flex items-center gap-2 text-amber-400">
                      <Trophy className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">The Challenge</span>
                    </div>
                    <p className="text-[12px] text-[#9ca3af] leading-relaxed font-sans border-l border-white/5 pl-3">
                      {project.challenges}
                    </p>
                  </motion.div>
                )}
                {project.learnings && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={isFlipped ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.45 }}
                    className="space-y-2.5"
                  >
                    <div className="flex items-center gap-2 text-indigo-400">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Learnings</span>
                    </div>
                    <p className="text-[12px] text-[#9ca3af] leading-relaxed font-sans border-l border-white/5 pl-3">
                      {project.learnings}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Backside Action Links */}
            <div className="mt-6 grid grid-cols-2 gap-4 pt-5 border-t border-white/5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-[11px] font-bold hover:bg-white/10 transition-all active:scale-95"
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
                  className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-blue-600 text-white text-[11px] font-bold hover:bg-blue-500 shadow-[0_10px_25px_rgba(59,130,246,0.3)] transition-all active:scale-95"
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
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        variants={containerVariants}
        className="space-y-16"
      >
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
