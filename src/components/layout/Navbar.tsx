import React, { useState, useEffect } from "react";
import { Menu, X, Terminal, FileDown } from "lucide-react";
import { motion, AnimatePresence, Variants } from "motion/react";

interface NavbarProps {
  onResumeClick: () => void;
}

export default function Navbar({ onResumeClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Tech Stack", href: "#stack" },
    { name: "Experience", href: "#experience" },
    { name: "Ask Rahul AI", href: "#ai-agent" },
    { name: "Contact", href: "#contact" }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  const navRevealVariants: Variants = {
    hidden: { opacity: 0, y: -30, filter: "blur(4px)" },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay: custom * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand/Logo */}
        <motion.a
          href="#"
          onClick={(e) => handleLinkClick(e, "#")}
          initial="hidden"
          animate="visible"
          variants={navRevealVariants}
          custom={1}
          className="flex items-center gap-2.5 group transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-lg shadow-blue-500/5 group-hover:scale-110 active:scale-95 transition-all">
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-heading font-extrabold text-base tracking-relaxed text-white group-hover:text-blue-400 transition-colors">
            RAHUL SHAW
          </span>
        </motion.a>

        {/* Desktop nav menu */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-6">
            {navLinks.map((link, idx) => (
              <motion.li 
                key={link.name}
                initial="hidden"
                animate="visible"
                variants={navRevealVariants}
                custom={idx + 2}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-heading font-medium text-[13px] tracking-wide text-[#9ca3af] hover:text-white transition-colors py-2 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.button
            id="download-resume-btn-desktop"
            initial="hidden"
            animate="visible"
            variants={navRevealVariants}
            custom={navLinks.length + 2}
            onClick={onResumeClick}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-[10px] tracking-widest uppercase px-5 py-2.5 rounded-full shadow-[0_5px_15px_rgba(59,130,246,0.2)] hover:shadow-[0_8px_25px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <FileDown className="w-3.5 h-3.5" />
            Resume
          </motion.button>
        </nav>

        {/* Mobile menu trigger button */}
        <motion.button
          id="mobile-menu-trigger"
          initial="hidden"
          animate="visible"
          variants={navRevealVariants}
          custom={2}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-[#9ca3af] hover:text-white transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="md:hidden absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-brand-border overflow-hidden z-45 flex flex-col gap-6"
          >
            <div className="py-6 px-8 flex flex-col gap-6">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="block text-[#9ca3af] hover:text-white text-lg font-heading font-semibold py-1 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <button
                id="download-resume-btn-mobile"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onResumeClick();
                }}
                className="group flex items-center justify-center gap-2 bg-[#161719] border border-white/5 text-white text-sm font-bold py-3.5 rounded-xl hover:bg-white/5 active:scale-95 transition-all w-full relative overflow-hidden"
              >
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                />
                <FileDown className="w-4 h-4 text-blue-400" />
                Download Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
