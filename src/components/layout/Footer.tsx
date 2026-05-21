import React from "react";
import { Terminal, Share2, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-brand-border pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12 lg:gap-8 mb-24">
          <div className="space-y-6">
            <div className="font-heading font-extrabold text-[#e5e2e1] text-3xl tracking-tighter">
              RAHUL SHAW
            </div>
            <p className="text-[#9ca3af] leading-relaxed max-w-xs text-base">
              Full-Stack MERN Engineer specializing in robust, scalable backend systems, secure authorization, and modern AI workflows.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/rahulshaw-dev"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-400 transition-all text-[#9ca3af]"
                title="GitHub"
              >
                <Terminal className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/rahulshaw-dev"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-400 transition-all text-[#9ca3af]"
                title="LinkedIn"
              >
                <Share2 className="w-5 h-5" />
              </a>
              <a
                href="mailto:rahulshaw.dev@nxerra.com"
                className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:bg-drop-glow/10 hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-400 transition-all text-[#9ca3af]"
                title="Email Direct"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#projects"
                  onClick={(e) => handleLinkClick(e, "#projects")}
                  className="text-[#9ca3af] hover:text-blue-400 transition-colors text-base"
                >
                  Featured Projects
                </a>
              </li>
              <li>
                <a
                  href="#stack"
                  onClick={(e) => handleLinkClick(e, "#stack")}
                  className="text-[#9ca3af] hover:text-blue-400 transition-colors text-base"
                >
                  Core Tech Stack
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  onClick={(e) => handleLinkClick(e, "#experience")}
                  className="text-[#9ca3af] hover:text-blue-400 transition-colors text-base"
                >
                  Professional Experience
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                  className="text-[#9ca3af] hover:text-blue-400 transition-colors text-base"
                >
                  Hire & Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Featured Work</h4>
            <ul className="space-y-4">
              <li>
                <span className="text-[#9ca3af] hover:text-blue-400 transition-colors text-base cursor-pointer">
                  Freight-Intel
                </span>
              </li>
              <li>
                <span className="text-[#9ca3af] hover:text-blue-400 transition-colors text-base cursor-pointer">
                  XORA AI Portal
                </span>
              </li>
              <li>
                <span className="text-[#9ca3af] hover:text-blue-400 transition-colors text-base cursor-pointer">
                  Camellia E-Comm
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 font-heading">Collaborate</h4>
            <div className="space-y-4">
              <a
                href="mailto:rahulshaw.dev@nxerra.com"
                className="text-[#9ca3af] hover:text-blue-400 transition-colors text-base block"
              >
                rahulshaw.dev@nxerra.com
              </a>
              <p className="text-[#9ca3af] flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-blue-500" />
                Kolkata, India
              </p>
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  onClick={() => {
                    const target = document.querySelector("#contact");
                    if (target) {
                      const topOffset = target.getBoundingClientRect().top + window.scrollY - 85;
                      window.scrollTo({ top: topOffset, behavior: "smooth" });
                    }
                  }}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-103 active:scale-97 transition-all text-center"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-[#9ca3af]">
            &copy; {currentYear} Rahul Shaw. Production-Focused Full-Stack Engineering.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#9ca3af] font-mono">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Production v2.5.0
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Uptime 99.9%
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
