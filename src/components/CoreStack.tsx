import { useState, MouseEvent } from "react";
import { Cpu, Globe, Server, Zap, Database, Terminal, FileText, Check } from "lucide-react";
import { SKILLS, CORE_STACK } from "../data";
import { Skill } from "../types";

export default function CoreStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Backend", "Frontend", "AI Workflows", "Databases", "Tools"];

  // Handles dynamic spotlight movement variables (--x, --y)
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-8 h-8" />;
      case "Globe":
        return <Globe className="w-8 h-8" />;
      case "Server":
        return <Server className="w-8 h-8" />;
      case "Zap":
        return <Zap className="w-8 h-8" />;
      case "Database":
        return <Database className="w-8 h-8" />;
      case "Terminal":
        return <Terminal className="w-8 h-8" />;
      default:
        return <Zap className="w-8 h-8" />;
    }
  };

  const filteredSkills = selectedCategory === "All"
    ? SKILLS
    : SKILLS.filter((s) => s.category === selectedCategory);

  return (
    <section id="stack" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Title block */}
      <div className="space-y-4 text-left">
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-white mb-2">
          Core Stack
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl">
          Standard engineering toolkit for robust, production-grade applications.
        </p>
      </div>

      {/* Hero Stack layout: 5 Column Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {CORE_STACK.map((tech, i) => (
          <div
            key={tech.name}
            onMouseMove={handleMouseMove}
            style={{ animationDelay: `${i * 100}ms` }}
            className="spotlight-card glass-card p-8 rounded-[2rem] flex flex-col items-center justify-center gap-5 text-center min-h-[220px] select-none hover:-translate-y-1 animate-fade-in"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-md">
              {getIcon(tech.icon)}
            </div>
            <div className="space-y-1">
              <h3 className="font-headline font-bold text-lg text-white">{tech.name}</h3>
              <p className="text-xs text-gray-500 font-medium font-sans leading-tight">
                {tech.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Interactive Tech Library */}
      <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 space-y-8 bg-black/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <h3 className="text-xl font-headline font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-400" />
              Expanded Skill-set Directory
            </h3>
            <p className="text-xs text-gray-400">
              Interactive categorization of engineering tools, frameworks, and workflows.
            </p>
          </div>

          {/* Categories Pill row */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all border ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white border-blue-500"
                    : "bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition-all group select-none"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                <Check className="w-4 h-4 text-xs" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-300 group-hover:text-white transition-colors">
                  {skill.name}
                </p>
                <p className="text-[10px] text-gray-500 tracking-wider font-mono uppercase">
                  {skill.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
