import { projects } from "../../data/projects";
import { Terminal, Globe, ArrowUpRight } from "lucide-react";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-28 px-6 max-w-7xl mx-auto relative">
      {/* Background neon dust glow */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-blue-500 font-sans">
            Curated Showcases
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-[#9ca3af] leading-relaxed text-base">
            Exploring the bounds of robust backend systems, advanced state machine coordination, and sleek user experiences.
          </p>
        </div>

        {/* Project display index cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-[2rem] overflow-hidden flex flex-col group h-full relative"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden border-b border-brand-border bg-[#0a0a0a]">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
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
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-[#0f1012]/85 border border-white/5 flex items-center justify-center text-white hover:text-blue-400 hover:border-blue-500/50 hover:bg-black/85 transition-all text-xs"
                      title="GitHub Repository"
                    >
                      <Terminal className="w-5 h-5" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-[#0f1012]/85 border border-white/5 flex items-center justify-center text-white hover:text-blue-400 hover:border-blue-500/50 hover:bg-black/85 transition-all text-xs"
                      title="Live Deployment"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Text metadata content block */}
              <div className="p-8 flex flex-col justify-between flex-grow space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-2xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-[#9ca3af] leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>
                </div>

                {/* Technology pill list */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5 items-center justify-between">
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
                  <button className="text-white hover:text-blue-400 font-bold text-xs uppercase flex items-center gap-1 group-hover/btn:translate-x-1 transition-all">
                    Detail
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
