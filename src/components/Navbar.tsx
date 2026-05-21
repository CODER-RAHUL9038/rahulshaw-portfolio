import { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleDownloadResume = () => {
    alert("Triggering resume download request. Rahul Shaw's ATS-optimized full-stack engineering resume packet will download shortly!");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center" id="nav-container">
        {/* Name Brand */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-headline font-extrabold tracking-tighter text-white cursor-pointer select-none"
        >
          RAHUL SHAW
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("projects")}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("stack")}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Tech Stack
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>

          <button
            onClick={handleDownloadResume}
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            Resume
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-white transition-colors p-1 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0af5] backdrop-blur-2xl border-b border-white/5 absolute top-full left-0 w-full py-8 px-6 flex flex-col gap-6 animate-fade-in">
          <button
            onClick={() => scrollToSection("projects")}
            className="text-left text-lg font-medium text-gray-300 hover:text-white py-2"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("stack")}
            className="text-left text-lg font-medium text-gray-300 hover:text-white py-2"
          >
            Tech Stack
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="text-left text-lg font-medium text-gray-300 hover:text-white py-2"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-left text-lg font-medium text-gray-300 hover:text-white py-2"
          >
            Contact
          </button>

          <button
            onClick={handleDownloadResume}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/15"
          >
            <FileText className="w-5 h-5" />
            Download Resume
          </button>
        </div>
      )}
    </header>
  );
}
