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
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset =
        target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
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

  const mobileMenuVariants: Variants = {
    closed: {
      x: "100%",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
        when: "afterChildren",
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const mobileItemVariants: Variants = {
    closed: {
      opacity: 0,
      x: 40,
      rotateY: 25,
      filter: "blur(4px)",
    },
    open: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <>
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
          <nav className="hidden lg:flex items-center gap-10">
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

          {/* Mobile/Tab menu trigger button */}
          <motion.button
            id="mobile-menu-trigger"
            initial="hidden"
            animate="visible"
            variants={navRevealVariants}
            custom={2}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-[100] flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-[#9ca3af] hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </header>

      {/* Mobile/Tab nav Full-Screen Side Drawer - Moved OUTSIDE of header for isolated stacking context */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[80] lg:hidden">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Side Menu Content */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="absolute top-0 right-0 h-full w-[80%] max-w-sm bg-[#050505]/95 backdrop-blur-2xl border-l border-brand-border shadow-2xl flex flex-col pt-6"
            >
              {/* Internal Close Button */}
              <div className="flex justify-end px-6 mb-4">
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-white/5 text-[#9ca3af] hover:text-white transition-all active:scale-90"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="px-10 flex flex-col gap-12">
                <ul className="flex flex-col gap-8 perspective-1000">
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.name}
                      variants={mobileItemVariants}
                      className="origin-left"
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="block text-[#9ca3af] hover:text-white text-xl font-heading font-bold py-1 transition-colors"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div variants={mobileItemVariants}>
                  <button
                    id="download-resume-btn-mobile"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onResumeClick();
                    }}
                    className="group flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-bold py-4.5 rounded-2xl hover:bg-blue-500 active:scale-95 transition-all w-full relative overflow-hidden shadow-lg shadow-blue-500/20"
                  >
                    <motion.div
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                    />
                    <FileDown className="w-5 h-5" />
                    Resume
                  </button>
                </motion.div>

                <motion.div
                  variants={mobileItemVariants}
                  className="mt-4 pt-12 border-t border-white/5"
                >
                  <p className="text-[10px] font-mono text-[#4b5563] uppercase tracking-[0.2em]">
                    Rahul Shaw Portfolio v1.0
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
