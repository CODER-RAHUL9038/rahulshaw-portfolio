import { Terminal, Share2, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-[#050505] py-12 px-6 md:px-12 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6" id="footer-container">
        
        {/* Left Side Brand */}
        <div className="text-center md:text-left space-y-1">
          <p
            onClick={handleScrollToTop}
            className="text-lg font-headline font-bold text-white tracking-widest uppercase cursor-pointer select-none hover:text-blue-400 transition-colors"
          >
            Rahul Shaw
          </p>
          <p className="text-xs text-gray-500 font-sans">
            Full-Stack MERN & AI Workflows Engineer
          </p>
        </div>

        {/* Center: Handcrafted with pride/heart */}
        <div className="text-xs text-gray-500 font-medium font-sans flex items-center gap-1.5 order-last md:order-none select-none">
          Handcrafted in <span className="text-blue-500">2025</span> using React & Tailwind
          <Heart className="w-3.5 h-3.5 text-blue-500/80 animate-pulse" />
        </div>

        {/* Right Side Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="referrePolicy='no-referrer'"
            className="text-gray-500 hover:text-white hover:scale-105 transition-all p-2 rounded-lg bg-white/[0.01] border border-white/5"
            title="GitHub Codebase"
          >
            <Terminal className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="referrePolicy='no-referrer'"
            className="text-gray-500 hover:text-white hover:scale-105 transition-all p-2 rounded-lg bg-white/[0.01] border border-white/5"
            title="Professional Network"
          >
            <Share2 className="w-4 h-4" />
          </a>
          <a
            href="mailto:rahulshaw.dev@nxerra.com"
            className="text-gray-500 hover:text-white hover:scale-105 transition-all p-2 rounded-lg bg-white/[0.01] border border-white/5"
            title="Contact Direct"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto text-center md:text-left mt-8 pt-8 border-t border-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-gray-600 font-sans tracking-wide">
          &copy; {currentYear} Rahul Shaw. All rights reserved. Registered under personal professional licensing.
        </p>

        <button
          onClick={handleScrollToTop}
          className="text-[10px] font-mono text-gray-500 hover:text-white transition-colors cursor-pointer capitalize"
        >
          Back To Top &uarr;
        </button>
      </div>
    </footer>
  );
}
