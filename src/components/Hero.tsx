import { useState, useEffect } from "react";
import { Terminal, Share2, Mail } from "lucide-react";

const WORDS = [
  "Backend-Heavy MERN Developer",
  "Full-Stack Engineer",
  "AI-Assisted Architect",
  "Production-Focused Engineer"
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullWord = WORDS[wordIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing characters
        setDisplayText(currentFullWord.substring(0, displayText.length + 1));
        setTypingSpeed(75);

        if (displayText === currentFullWord) {
          // Pause at the end of word before deleting
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        // Deleting characters
        setDisplayText(currentFullWord.substring(0, displayText.length - 1));
        setTypingSpeed(40);

        if (displayText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % WORDS.length);
          setTypingSpeed(450); // Pause before starting next word
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, typingSpeed]);

  const scrollToContact = () => {
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProjects = () => {
    const projects = document.getElementById("projects");
    if (projects) {
      projects.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 w-full">
        
        {/* Left Side: Copy */}
        <div className="lg:col-span-7 space-y-8 text-left animate-fade-in">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.1)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for Projects
          </div>

          {/* Heading */}
          <div className="space-y-6">
            <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
              Building Fast, <br />
              <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                Reliable
              </span>{" "}
              Web Systems.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
              Hi, I’m <span className="text-white font-medium">Rahul Shaw</span>, a backend-heavy MERN developer focused on{" "}
              <span className="text-white underline decoration-blue-500/50 decoration-2 underline-offset-4">
                scalable systems
              </span>
              , secure API architectures, and modern AI-assisted workflows.
            </p>
          </div>

          {/* Typewriter text line */}
          <div className="h-8 flex items-center">
            <div className="text-sm font-code font-bold tracking-wider text-blue-400 uppercase bg-blue-950/30 px-3 py-1.5 rounded-lg border border-blue-500/10">
              {displayText}
              <span className="typing-cursor"></span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={scrollToProjects}
              className="bg-blue-600 text-white font-bold px-8 py-4.5 rounded-2xl shadow-[0_10px_30px_rgba(59,130,246,0.25)] hover:shadow-[0_15px_45px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all text-center cursor-pointer"
            >
              View Projects
            </button>
            <button
              onClick={scrollToContact}
              className="border border-white/10 bg-white/5 text-gray-200 px-8 py-4.5 rounded-2xl hover:bg-white/10 hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all text-center backdrop-blur-sm cursor-pointer"
            >
              Contact Directly
            </button>
          </div>

          {/* Connect Badges */}
          <div className="flex items-center gap-6 pt-6 border-t border-white/5 w-fit">
            <span className="text-xs font-mono tracking-wider text-gray-500 uppercase">
              Secure Terminals:
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="referrePolicy='no-referrer'"
                className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all p-2 bg-white/5 rounded-xl border border-white/5"
                title="GitHub Repository"
              >
                <Terminal className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="referrePolicy='no-referrer'"
                className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all p-2 bg-white/5 rounded-xl border border-white/5"
                title="Share Profile"
              >
                <Share2 className="w-5 h-5" />
              </a>
              <a
                href="mailto:rahulshaw.dev@nxerra.com"
                className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all p-2 bg-white/5 rounded-xl border border-white/5"
                title="Direct Mail Connection"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Showcase image */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[420px] aspect-[4/5] cinematic-container">
            {/* Pulsing deep glow behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
            
            {/* Interactive neon borders */}
            <div className="neon-border-glow"></div>

            {/* Profile frame */}
            <div className="w-full h-full p-2.5 rounded-[2.5rem] border border-blue-500/20 bg-black/40 backdrop-blur-md overflow-hidden profile-glow">
              <div className="w-full h-full rounded-[2.2rem] overflow-hidden border-4 border-[#121212]/50 shadow-inner relative">
                <img
                  alt="Rahul Shaw Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top scale-100 mix-blend-normal transition-transform duration-700 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD79pwVB9xieOO1DQzVI0qnn27GHQNS7haldVjSKK_PUjKMOGa09VMagxeylvTTka0WTcGIXEuvTNZ8yPYrlztTgnfLLQb4ILOoifErYEwPLOdTU1beq5nO_XGtPHCvq_piWCmT2ylp2qIyiH1ltP2LMDHvPnk0jfw8-u7oe7kuqkx1EvCJDOCsy-3egtpYLpJL3GiWUSpCO6jmk3Ri8ivldIntKRg5EU5zkd84KzECKV4mILw959R-Huc5POPDqhKaRTVk1RoXpkE"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
