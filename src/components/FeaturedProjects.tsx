import { useState } from "react";
import { Terminal, Github, ExternalLink, X, Cpu, Server, Shield, Sparkles } from "lucide-react";
import { PROJECTS } from "../data";
import { Project } from "../types";

export default function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const getArchitectureBreakdown = (pTitle: string) => {
    if (pTitle.startsWith("Freight")) {
      return {
        goal: "Supply chain compliance and cross-border transport validation.",
        challenge: "Synchronizing rapid bulk payload schemas without database lock latency and securing route operations.",
        achievement: "Engineered secure cryptography-backed JWT sessions with automatic payload rotation; optimized index lookup parameters to lower response read times.",
        services: ["Multi-tenant JWT gatekeeper", "Elastic collection pipelines", "Compliance state listeners"]
      };
    } else {
      return {
        goal: "High-frequency streaming model orchestrations.",
        challenge: "Mitigating buffering interruptions and interface flicker on fast LLM token emission streams.",
        achievement: "Configured SSE chunk processing pipelines; constructed custom layouts preventing reflow re-render calculation overload.",
        services: ["LLM Stream Consumer", "Dynamic Markdown Renderer", "Prompts Sandbox Compiler"]
      };
    }
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Title block */}
      <div className="space-y-4 text-left">
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-white mb-2">
          Featured Projects
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl">
          Documented engineering solutions for complex backend and frontend challenges.
        </p>
      </div>

      {/* Grid: 2 Column Projects Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {PROJECTS.map((project, idx) => (
          <div
            key={project.title}
            className="group flex flex-col space-y-6 animate-fade-in"
            style={{ animationDelay: `${idx * 200}ms` }}
          >
            {/* Visual Header Image Card */}
            <div
              onClick={() => setActiveProject(project)}
              className="relative aspect-video rounded-3xl overflow-hidden glass-card cursor-pointer group-hover:border-blue-500/30 transition-all bg-black"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              
              {/* Quick Info Overlay pill */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider text-gray-300">
                Click to inspect architecture
              </div>
            </div>

            {/* Core copy */}
            <div className="space-y-4 text-left">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/10 px-3.5 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3
                onClick={() => setActiveProject(project)}
                className="text-2xl font-headline font-bold text-white hover:text-blue-400 cursor-pointer transition-colors"
              >
                {project.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {project.description}
              </p>

              {/* Action row */}
              <div className="flex items-center gap-4 pt-1">
                <button
                  onClick={() => setActiveProject(project)}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  View Architecture Breakdown
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cinematic Detail overlay backdrop Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          ></div>

          {/* Modal Container */}
          <div className="relative bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] max-w-2xl w-full p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh] z-10 animate-scale-up space-y-8">
            
            {/* Header toolbar */}
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1 text-left">
                <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-blue-400">
                  Engineering Case Details
                </h4>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-white leading-tight">
                  {activeProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-2 rounded-full bg-white/5 border border-white/5 hover:border-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Banner preview */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
              <img
                src={activeProject.imageUrl}
                alt={activeProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Structural details */}
            <div className="space-y-6 text-left">
              {/* Context */}
              <div className="space-y-2">
                <h5 className="text-sm font-semibold text-gray-200 uppercase tracking-wider font-headline">
                  System Context
                </h5>
                <p className="text-sm text-gray-400 leading-relaxed font-sans">
                  {activeProject.longDescription || activeProject.description}
                </p>
              </div>

              {/* Architecture columns */}
              <div className="grid md:grid-cols-2 gap-6 pt-2">
                {/* Challenge */}
                <div className="p-5 rounded-xl border border-white/5 bg-white/[0.01] space-y-2">
                  <div className="flex items-center gap-2 text-red-400">
                    <Cpu className="w-4 h-4" />
                    <h6 className="text-xs font-bold uppercase tracking-wider">The Challenge</h6>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {getArchitectureBreakdown(activeProject.title).challenge}
                  </p>
                </div>

                {/* Achievement */}
                <div className="p-5 rounded-xl border border-white/5 bg-white/[0.01] space-y-2">
                  <div className="flex items-center gap-2 text-green-400">
                    <Shield className="w-4 h-4" />
                    <h6 className="text-xs font-bold uppercase tracking-wider">The Solution</h6>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {getArchitectureBreakdown(activeProject.title).achievement}
                  </p>
                </div>
              </div>

              {/* Technologies row */}
              <div className="space-y-3 pt-2">
                <h5 className="text-sm font-semibold text-gray-100 uppercase tracking-wider font-headline">
                  Validated Tech Integration
                </h5>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono font-bold text-blue-400 uppercase bg-blue-950/20 px-3 py-1.5 rounded-lg border border-blue-500/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky contact CTA inside modal */}
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] font-mono text-gray-500">
                Source control is stored privately under Enterprise permissions.
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert("Simulating redirect to secure source repo context.")}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-4 py-2 rounded-xl text-xs hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  Request Access
                </button>
                <button
                  onClick={() => alert(`Launching remote proxy mock server demo for: ${activeProject.title}`)}
                  className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl text-xs hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Platform Demo
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
