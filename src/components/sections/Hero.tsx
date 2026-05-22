import React from "react";
import { Terminal, Share2, Mail, ArrowRight, Download } from "lucide-react";
import Typewriter from "typewriter-effect";
import { motion } from "motion/react";

interface HeroProps {
  onResumeClick: () => void;
}

const ROLES = [
  "Backend-Heavy MERN Developer",
  "Full-Stack Engineer",
  "AI-Augmented Developer",
  "Production-Focused Developer",
  "Freelance Developer",
];

export default function Hero({ onResumeClick }: HeroProps) {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    if (target) {
      const topOffset =
        target.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 6, filter: "blur(8px)" },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: custom * 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 md:pt-32 pb-12 px-6 max-w-7xl mx-auto relative cinematic-bg">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-16 items-center z-10 w-full table-fixed">
        {/* Hero Left Content */}
        <div className="space-y-10 relative z-20 w-full min-w-0">
          <div className="space-y-10">
            {/* Headline block */}
            <div className="space-y-6">
              <motion.h1 
                custom={1}
                initial="hidden"
                animate="visible"
                variants={textRevealVariants}
                className="font-heading text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-white max-w-[12ch] md:max-w-none"
              >
                Building Fast, <br className="hidden md:block" />{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                  Reliable
                </span>{" "}
                Web Systems.
              </motion.h1>
              <motion.p 
                custom={2}
                initial="hidden"
                animate="visible"
                variants={textRevealVariants}
                className="text-lg md:text-xl text-[#9ca3af] font-sans leading-relaxed max-w-xl"
              >
                Hi, I’m <span className="text-white font-medium">Rahul Shaw</span>
                , a backend-heavy MERN developer focused on
                <span className="text-white font-medium"> scalable systems</span>,
                secure APIs, and modern AI-assisted workflows.
              </motion.p>
            </div>

            {/* Dynamic typing row */}
            <motion.div 
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textRevealVariants}
              className="text-sm md:text-base font-mono text-blue-400/90 flex items-center w-fit min-h-[1.5em]"
            >
              <span className="opacity-50 mr-2 text-xs font-bold text-blue-500">
                &gt;
              </span>
              <div className="tracking-tight">
                <Typewriter
                  options={{
                    strings: ROLES,
                    autoStart: true,
                    loop: true,
                    delay: 80,
                    deleteSpeed: 40,
                    wrapperClassName: "typewriter-text",
                    cursorClassName: "typewriter-cursor text-blue-500",
                  }}
                />
              </div>
            </motion.div>

            {/* Call to Actions & Social Integration */}
            <motion.div 
              custom={4}
              initial="hidden"
              animate="visible"
              variants={textRevealVariants}
              className="flex flex-col sm:flex-row gap-5 sm:items-center pt-3"
            >
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-4.5 rounded-2xl shadow-[0_10px_35px_rgba(59,130,246,0.2)] hover:shadow-[0_15px_45px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-300 min-w-[200px]"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={onResumeClick}
                className="group flex items-center justify-center gap-2 border border-white/5 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4.5 rounded-2xl shadow-lg hover:shadow-blue-500/10 active:scale-98 transition-all duration-300 min-w-[200px] backdrop-blur-md relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
                <Download className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                 Resume
              </button>

              {/* Mini Social icons list */}
              <div className="flex items-center gap-4 pl-2 mt-4 sm:mt-0">
                <a
                  href="https://github.com/rahulshaw-dev"
                  target="_blank"
                  rel="noreferrer"
                  className="group p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
                  aria-label="GitHub Developer Profile"
                >
                  <Terminal className="w-4 h-4 text-[#9ca3af] group-hover:text-blue-400 group-hover:scale-110 transition-all" />
                </a>
                <a
                  href="https://linkedin.com/in/rahulshaw-dev"
                  target="_blank"
                  rel="noreferrer"
                  className="group p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
                  aria-label="LinkedIn Authority Profile"
                >
                  <Share2 className="w-4 h-4 text-[#9ca3af] group-hover:text-blue-400 group-hover:scale-110 transition-all" />
                </a>
                <a
                  href="mailto:rahulshaw.dev@nxerra.com"
                  className="group p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
                  aria-label="Email Address Contacts"
                >
                  <Mail className="w-4 h-4 text-[#9ca3af] group-hover:text-blue-400 group-hover:scale-110 transition-all" />
                </a>
                <div className="h-px w-6 bg-white/10 ml-2 hidden sm:block"></div>
                <span className="text-[9px] font-mono text-[#4b5563] uppercase tracking-widest select-none whitespace-nowrap hidden sm:block">
                  Based in Kolkata, IN
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Right Avatar Visual - Cinematic Animation PRESERVED */}
        <div className="relative flex justify-center lg:justify-end lg:pr-4 mt-12 lg:mt-0 z-20 w-full min-w-0">
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.9, rotateY: 15, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0, filter: "blur(0px)" }}
            transition={{ 
              duration: 1.8, 
              ease: [0.16, 1, 0.3, 1], 
              delay: 0.2,
              opacity: { duration: 1.2 },
              scale: { duration: 1.8 }
            }}
            className="relative perspective-1000 w-full max-w-[420px]"
          >
            {/* Ambient space glow behind avatar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] bg-blue-500/5 blur-[120px] rounded-full pulse-glow pointer-events-none"></div>

            <div className="relative w-full aspect-[1/1.15] float-avatar">
              {/* Dynamic visual framing containing the primary portrait */}
              <div className="neon-border-glow rounded-[2.5rem]"></div>
              <div className="w-full h-full p-1.5 rounded-[2.5rem] border border-blue-500/15 bg-[#0f1012]/80 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.1)] relative z-10">
                <div className="w-full h-full rounded-[2.2rem] overflow-hidden border-2 border-[#131416]/70 shadow-2xl relative bg-[#0a0a0a]">
                  <img
                    alt="Rahul Shaw"
                    className="w-full h-full object-cover object-top scale-100 group-hover:scale-102 transition-transform duration-700 select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD79pwVB9xieOO1DQzVI0qnn27GHQNS7haldVjSKK_PUjKMOGa09VMagxeylvTTka0WTcGIXEuvTNZ8yPYrlztTgnfLLQb4ILOoifErYEwPLOdTU1beq5nO_XGtPHCvq_piWCmT2ylp2qIyiH1ltP2LMDHvPnk0jfw8-u7oe7kuqkx1EvCJDOCsy-3egtpYLpJL3GiWUSpCO6jmk3Ri8ivldIntKRg5EU5zkd84KzECKV4mILw959R-Huc5POPDqhKaRTVk1RoXpkE"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Visual branding in portrait margins */}
                  <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center bg-black/40 backdrop-blur-md border border-white/5 py-2 px-4 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-tighter uppercase">
                        Available For Projects
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
