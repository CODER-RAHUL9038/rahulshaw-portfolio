import React, { useState, useEffect } from "react";
import { Terminal, Share2, Mail, ArrowRight, Download } from "lucide-react";

interface HeroProps {
  onResumeClick: () => void;
}

export default function Hero({ onResumeClick }: HeroProps) {
  // Safe typewriter state to prevent layout shift
  const roles = [
    "Backend-Heavy MERN Developer",
    "Full-Stack Engineer",
    "AI-Assisted Developer",
    "Production-Focused Developer",
    "Freelance Developer"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = roles[currentRoleIndex];

    const type = () => {
      if (isDeleting) {
        setDisplayText(currentWord.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setDisplayText(currentWord.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }

      if (!isDeleting && charIndex === currentWord.length) {
        // Pause at the end of the word
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        timer = setTimeout(type, isDeleting ? 40 : 80);
      }
    };

    timer = setTimeout(type, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentRoleIndex]);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center pt-28 pb-12 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center z-10">
        {/* Hero Left Content */}
        <div className="space-y-8 animate-[reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 reveal-active">
          {/* Status Chip */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.1)] backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            Available for Projects
          </div>

          {/* Headline block */}
          <div className="space-y-4">
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
              Building Fast, <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                Reliable
              </span>{" "}
              Web Systems.
            </h1>
            <p className="text-lg md:text-xl text-[#9ca3af] font-sans leading-relaxed max-w-2xl">
              Hi, I’m <span className="text-white font-medium">Rahul Shaw</span>, a backend-heavy MERN developer focused on
              <span className="text-white font-medium"> scalable systems</span>, secure APIs, and modern AI-assisted workflows.
            </p>
          </div>

          {/* Dynamic typing row */}
          <div className="h-8 text-base md:text-lg font-mono text-blue-400 flex items-center bg-white/5 border border-white/5 px-4 rounded-xl w-fit backdrop-blur-lg">
            <span className="opacity-75 mr-2">&gt;_</span>
            <span>{displayText}</span>
            <span className="w-1.5 h-4 bg-blue-500 ml-1 animate-[blink_1s_step-end_infinite]"></span>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-4.5 rounded-2xl shadow-[0_10px_35px_rgba(59,130,246,0.25)] hover:shadow-[0_15px_45px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-300 min-w-[200px]"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={onResumeClick}
              className="flex items-center justify-center gap-2 border border-brand-border bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4.5 rounded-2xl active:scale-98 transition-all duration-300 min-w-[200px] backdrop-blur-sm"
            >
              <Download className="w-4 h-4 text-blue-400" />
              Download Resume
            </button>
          </div>

          {/* Mini Social icons list */}
          <div className="flex items-center gap-8 pt-4">
            <a
              href="https://github.com/rahulshaw-dev"
              target="_blank"
              rel="noreferrer"
              className="text-[#9ca3af] hover:text-blue-400 hover:scale-110 transition-all"
              aria-label="GitHub Developer Profile"
            >
              <Terminal className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/rahulshaw-dev"
              target="_blank"
              rel="noreferrer"
              className="text-[#9ca3af] hover:text-blue-400 hover:scale-110 transition-all"
              aria-label="LinkedIn Authority Profile"
            >
              <Share2 className="w-6 h-6" />
            </a>
            <a
              href="mailto:rahulshaw.dev@nxerra.com"
              className="text-[#9ca3af] hover:text-blue-400 hover:scale-110 transition-all"
              aria-label="Email Address Contacts"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Hero Right Avatar Visual (Float state + glowing effect) */}
        <div className="relative flex justify-center lg:justify-end animate-[reveal_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards] opacity-0 reveal-active">
          {/* Ambient space glow behind avatar */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] bg-blue-500/10 blur-[120px] rounded-full pulse-glow pointer-events-none"></div>

          <div className="relative w-full max-w-[460px] aspect-[4/5] float-avatar">
            {/* Dynamic visual framing containing the primary portrait */}
            <div className="neon-border-glow rounded-[2.5rem]"></div>
            <div className="w-full h-full p-1.5 rounded-[2.5rem] border border-blue-500/25 bg-[#0f1012]/50 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)]">
              <div className="w-full h-full rounded-[2.2rem] overflow-hidden border-2 border-[#131416]/70 shadow-2xl relative bg-[#0a0a0a]">
                <img
                  alt="Rahul Shaw"
                  className="w-full h-full object-cover object-top scale-100 group-hover:scale-102 transition-transform duration-700 select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD79pwVB9xieOO1DQzVI0qnn27GHQNS7haldVjSKK_PUjKMOGa09VMagxeylvTTka0WTcGIXEuvTNZ8yPYrlztTgnfLLQb4ILOoifErYEwPLOdTU1beq5nO_XGtPHCvq_piWCmT2ylp2qIyiH1ltP2LMDHvPnk0jfw8-u7oe7kuqkx1EvCJDOCsy-3egtpYLpJL3GiWUSpCO6jmk3Ri8ivldIntKRg5EU5zkd84KzECKV4mILw959R-Huc5POPDqhKaRTVk1RoXpkE"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Visual branding in portrait margins as requested by style guides (none or subtle, kept subtle and clean) */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-black/40 backdrop-blur-md border border-white/5 py-2.5 px-4 rounded-xl">
                  <span className="text-xs font-mono text-[#9ca3af]">FULL STACK</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
