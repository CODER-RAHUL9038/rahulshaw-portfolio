"use client";

import React from "react";
import { SiGithub, SiGmail, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Terminal, MapPin } from "lucide-react";
import { motion, Variants } from "motion/react";

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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  const textRevealVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-brand-border pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12 lg:gap-8 mb-24"
        >
          <div className="space-y-6">
            <motion.div variants={textRevealVariants} className="font-heading font-extrabold text-[#e5e2e1] text-3xl tracking-tighter">
              RAHUL SHAW
            </motion.div>
            <motion.p variants={textRevealVariants} className="text-[#9ca3af] leading-relaxed max-w-xs text-base">
              Full-Stack MERN Engineer specializing in robust, scalable backend systems, secure authorization, and modern AI workflows.
            </motion.p>
            <motion.div variants={textRevealVariants} className="flex gap-3">
              <a
                href="https://github.com/CODER-RAHUL9038"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-400 transition-all text-[#9ca3af]"
                title="GitHub"
              >
                <SiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rahulshaw-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-400 transition-all text-[#9ca3af]"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:rahulshaw903866@gmail.com"
                className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-400 transition-all text-[#9ca3af]"
                title="Email Direct"
              >
                <SiGmail className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/918240522820"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-400 transition-all text-[#9ca3af]"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
              >
                <SiWhatsapp className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.h4 variants={textRevealVariants} className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Navigation</motion.h4>
            <motion.ul variants={textRevealVariants} className="space-y-4">
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
            </motion.ul>
          </div>

          <div className="space-y-6">
            <motion.h4 variants={textRevealVariants} className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Featured Work</motion.h4>
            <motion.ul variants={textRevealVariants} className="space-y-4">
              <li>
                <a
                  href="https://rahul-shaw-ai-portfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9ca3af] hover:text-blue-400 transition-colors text-base"
                >
                  Personal Portfolio
                </a>
              </li>
              <li>
                <a
                  href="https://freight-intel-tau.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9ca3af] hover:text-blue-400 transition-colors text-base"
                >
                  Freight-Intel
                </a>
              </li>
              <li>
                <a
                  href="https://xora-ai-gamma.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9ca3af] hover:text-blue-400 transition-colors text-base"
                >
                  XORA AI Portal
                </a>
              </li>
              <li>
                <a
                  href="https://dr-maya-reynolds-site-ten.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9ca3af] hover:text-blue-400 transition-colors text-base"
                >
                  Dr Maya Reynolds
                </a>
              </li>
            </motion.ul>
          </div>

          <div className="space-y-6">
            <motion.h4 variants={textRevealVariants} className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 font-heading">Collaborate</motion.h4>
            <motion.div variants={textRevealVariants} className="space-y-4">
              <a
                href="mailto:rahulshaw903866@gmail.com"
                className="text-[#9ca3af] hover:text-blue-400 transition-colors text-base block"
              >
                rahulshaw903866@gmail.com
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
                      const topOffset = target.getBoundingClientRect().top + window.scrollY - 80;
                      window.scrollTo({ top: topOffset, behavior: "smooth" });
                    }
                  }}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-103 active:scale-97 transition-all text-center"
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-[#9ca3af]">
            &copy; {currentYear} Rahul Shaw. Production-Focused Full-Stack Engineering.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#9ca3af] font-mono">
            <span className="flex items-center gap-2">
              <motion.span 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-blue-500"
              ></motion.span>
              Uptime 99.9%
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

