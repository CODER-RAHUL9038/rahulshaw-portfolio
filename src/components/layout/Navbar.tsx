import React, { useState, useEffect } from "react";
import { Menu, X, Terminal, FileDown } from "lucide-react";

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
    { name: "AI Agent", href: "#ai-agent" },
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

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050505]/75 backdrop-blur-md border-b border-brand-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand/Logo */}
        <a
          href="#"
          onClick={(e) => handleLinkClick(e, "#")}
          className="flex items-center gap-2 group transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shadow-lg shadow-primary-container/20 group-hover:scale-110 active:scale-95 transition-all">
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-heading font-extrabold text-lg tracking-tighter text-white group-hover:text-blue-400 transition-colors">
            RAHUL SHAW
          </span>
        </a>

        {/* Desktop nav menu */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-heading font-medium text-sm text-[#9ca3af] hover:text-white transition-colors py-2 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          <button
            id="download-resume-btn-desktop"
            onClick={onResumeClick}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <FileDown className="w-3.5 h-3.5" />
            Resume
          </button>
        </nav>

        {/* Mobile menu trigger button */}
        <button
          id="mobile-menu-trigger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-[#9ca3af] hover:text-white transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-brand-border py-6 px-8 animate-fade-in z-45 flex flex-col gap-6">
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
            className="flex items-center justify-center gap-2 bg-[#161719] border border-brand-border text-white text-sm font-bold py-3.5 rounded-xl hover:bg-white/5 active:scale-95 transition-all w-full"
          >
            <FileDown className="w-4 h-4 text-blue-400" />
            Download Resume
          </button>
        </div>
      )}
    </header>
  );
}
