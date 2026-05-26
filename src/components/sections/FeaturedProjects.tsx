import { useState } from "react";
import { projects } from "../../data/projects";
import { Github, ExternalLink, ArrowUpRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  variants: Variants;
}

function ProjectCard({ project, variants }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 h-[420px] w-full group">
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          duration: 0.7, 
          type: "spring", 
          stiffness: 80, 
          damping: 20 
        }}
        className="relative w-full h-full transition-all duration-500 preserve-3d"
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 w-full h-full backface-hidden glass-card rounded-[2rem] overflow-hidden flex flex-col">
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

            {/* Badge tags overlay */}
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

          {/* Text metadata content block */}
          <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
            <div className="space-y-2">
              <h3 className="font-heading text-xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-[#9ca3af] leading-relaxed text-[13px] line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
              <button 
                onClick={() => setIsFlipped(true)}
                className="text-white hover:text-blue-400 font-bold text-[10px] uppercase flex items-center gap-1.5 transition-all"
              >
                Learn More
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              
              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9ca3af] hover:text-white transition-colors"
                  >
                    <Github className="w-4.5 h-4.5" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9ca3af] hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4.5 h-4.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden glass-card rounded-[2rem] overflow-hidden flex flex-col p-8 bg-[#0a0a0a]/95 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="flex flex-col h-full space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-heading text-xl font-extrabold text-blue-400 tracking-tight">
                  Project Details
                </h3>
                <div className="h-1 w-12 bg-blue-500 rounded-full mt-2"></div>
              </div>
              <button 
                onClick={() => setIsFlipped(false)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#9ca3af] hover:text-white hover:bg-white/10 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto pr-2 scrollbar-thin">
              <p className="text-sm text-[#e5e2e1] leading-relaxed">
                {project.description}
              </p>
              
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg text-[10px] font-mono font-medium bg-[#161719] border border-white/5 text-[#9ca3af]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 shadow-[0_4px_15px_rgba(59,130,246,0.3)] transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
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
