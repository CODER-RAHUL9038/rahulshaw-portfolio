import React from "react";
import { SiGithub, SiGmail } from "@icons-pack/react-simple-icons";
import { ArrowRight, Download } from "lucide-react";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.6 1.098-1.071 1.834-1.378.736-.308 1.533-.443 2.327-.396 3.703 0 4.384 2.438 4.384 5.607v6.058h-.01zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import Typewriter from "typewriter-effect";
import { motion, Variants, useScroll, useTransform } from "motion/react";

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
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 100]);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    if (target) {
      const topOffset =
        target.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  const headingVariants: Variants = {
    hidden: { y: "100%" },
    visible: (custom: number) => ({
      y: 0,
      transition: {
        duration: 0.9,
        delay: (custom || 0) * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const textRevealVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: (custom || 0) * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section className="min-h-screen flex flex-col justify-center pt-28 md:pt-32 pb-12 px-6 max-w-7xl mx-auto relative cinematic-bg">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6 lg:gap-16 items-center z-10 w-full">
        {/* Hero Left Content */}
        <div className="space-y-6 md:space-y-10 relative z-20 w-full min-w-0 order-2 lg:order-1">
          <div className="space-y-6 md:space-y-10">
            {/* Headline block */}
            <div className="space-y-4 md:space-y-6">
              <h1 className="font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-white max-w-[12ch] md:max-w-none">
                <div className="overflow-hidden">
                  <motion.div
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                  >
                    Building Fast,
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                      Reliable
                    </span>{" "}
                    Web Systems.
                  </motion.div>
                </div>
              </h1>
              <motion.p 
                custom={3}
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
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-4.5 rounded-2xl shadow-[0_10px_35px_rgba(59,130,246,0.2)] hover:shadow-[0_15px_45px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-300 min-w-[150px]"
              >
                 Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://docs.google.com/document/d/1bC9X-X4A2a8mkWtWHsKFGEhGCfGEzUFcLkjqbcROJao/export?format=pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 border border-white/5 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4.5 rounded-2xl shadow-lg hover:shadow-blue-500/10 active:scale-98 transition-all duration-300 min-w-[150px] backdrop-blur-md relative overflow-hidden"
              >
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                />
                <Download className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                 Resume
              </a>

              {/* Mini Social icons list */}
              <div className="flex flex-wrap items-center gap-4 pl-1 mt-6 sm:mt-0">
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/CODER-RAHUL9038"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
                    aria-label="GitHub Developer Profile"
                  >
                    <SiGithub className="w-4 h-4 text-[#9ca3af] group-hover:text-blue-400 group-hover:scale-110 transition-all" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rahulshaw-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
                    aria-label="LinkedIn Authority Profile"
                  >
                    <LinkedInIcon className="w-4 h-4 text-[#9ca3af] group-hover:text-blue-400 group-hover:scale-110 transition-all" />
                  </a>
                  <a
                    href="mailto:rahulshaw903866@gmail.com"
                    className="group p-2 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
                    aria-label="Email Address Contacts"
                  >
                    <SiGmail className="w-4 h-4 text-[#9ca3af] group-hover:text-blue-400 group-hover:scale-110 transition-all" />
                  </a>
                </div>
                
                <div className="h-px w-6 bg-white/15 ml-1"></div>
                <span className="text-[10px] font-mono text-[#9ca3af] uppercase tracking-widest select-none whitespace-nowrap">
                  Based in Kolkata, IN
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Right Avatar Visual */}
        <div className="relative flex justify-center lg:justify-end lg:pr-4 z-20 w-full min-w-0 order-1 lg:order-2 mb-6 lg:mb-0">
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.9, rotateY: 15, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0, filter: "blur(0px)" }}
            transition={{ 
              duration: 1.8, 
              ease: [0.16, 1, 0.3, 1] as const, 
              delay: 0.2,
              opacity: { duration: 1.2 },
              scale: { duration: 1.8 }
            }}
            className="relative perspective-1000 w-full max-w-[300px] md:max-w-[500px] lg:max-w-[420px]"
          >
            {/* Ambient space glow behind avatar */}
            <motion.div 
              style={{ y: parallaxY }}
              animate={{ 
                opacity: [0.35, 0.5, 0.35],
                scale: [1, 1.04, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"
            />

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full aspect-[1/1.15]"
            >
              {/* Dynamic visual framing containing the primary portrait */}
              <motion.div 
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-[-1px] rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-transparent to-purple-600 bg-[length:300%_300%] z-[-1] opacity-25 blur-[10px]"
              />
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
                      <motion.span 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                      ></motion.span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-tighter uppercase">
                        Available For Projects
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Section Partition */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </section>
  );
}
