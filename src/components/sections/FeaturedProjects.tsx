import { projects } from "../../data/projects";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { motion, Variants } from "motion/react";

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
    <section id="projects" className="py-28 px-6 max-w-7xl mx-auto relative">
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
            <motion.div
              key={project.id}
              variants={textRevealVariants}
              whileHover={{ y: -8 }}
              className="glass-card rounded-[2rem] overflow-hidden flex flex-col group h-full relative"
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

                {/* Icon shortcuts overlay */}
                <div className="absolute bottom-6 right-6 flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-[#0f1012]/85 border border-white/5 flex items-center justify-center text-white hover:text-blue-400 hover:border-blue-500/50 hover:bg-black/85 transition-all text-xs"
                      title="GitHub Repository"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-[#0f1012]/85 border border-white/5 flex items-center justify-center text-white hover:text-blue-400 hover:border-blue-500/50 hover:bg-black/85 transition-all text-xs"
                      title="Live Deployment"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Text metadata content block */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  {/* Reduced project description font size to shrink card height */}
                  <p className="text-[#9ca3af] leading-relaxed text-[13px] line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Technology pill list */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 items-center justify-between mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-[#161719] border border-brand-border text-[#9ca3af]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* Top margin added for visual separation */}
                  <button className="text-white hover:text-blue-400 font-bold text-[10px] uppercase flex items-center gap-1 group-hover/btn:translate-x-1 transition-all mt-4">
                    View Project
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
