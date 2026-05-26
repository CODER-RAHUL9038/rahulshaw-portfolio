import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "portfolio-nextjs",
    title: "Rahul Shaw's  Portfolio",
    description:
      "Cinematic Next.js portfolio engineered with immersive UI systems, responsive layouts, Framer Motion animations, AI-assisted workflows, and production-focused frontend architecture.",
    tech: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Gemini API",
    ],
    image: "/projects/portfolio.png",
    featured: true,
    github: "https://github.com/CODER-RAHUL9038/rahulshaw-portfolio",
    live: "https://rahulshaw.carrd.co",
    status: "Completed",
    overview: "A premium developer showcase focused on cinematic motion and AI integration.",
    features: [
      "AI Recruiter Assistant via Gemini API",
      "Framer Motion powered 3D interactions",
      "Responsive glassmorphism UI system",
      "Production-grade Next.js 15 architecture"
    ],
    challenges: "Synchronizing complex 3D animations with React's state management while maintaining 60fps performance on mobile.",
    learnings: "Mastered advanced Framer Motion patterns and recursive component design for scalable UI systems."
  },
  {
    id: "freight-intel",
    title: "Freight Intel Dashboard",
    description:
      "Logistics-focused dashboard system designed for scalable data visualization, backend-heavy workflows, secure operational handling, and production-focused architecture.",
    tech: ["Next.js", "MongoDB", "Node.js", "Express.js"],
    image: "/projects/fright-intel.png",
    featured: true,
    github: "https://github.com/CODER-RAHUL9038",
    live: "https://freight-intel-tau.vercel.app/",
    status: "Completed",
    overview: "Operational logistics dashboard for real-time freight tracking and analytics.",
    features: [
      "Real-time supply chain logging",
      "Automated operational triage reporting",
      "Secure RBAC modules for institution access",
      "High-capacity fulfillment tracking"
    ],
    challenges: "Handling large streams of real-time logistics data without blocking the main event loop.",
    learnings: "Improved understanding of MERN stack performance optimization and real-time data streaming."
  },
  {
    id: "camellia",
    title: "Camellia",
    description:
      "Airbnb-inspired MERN application featuring authentication, authorization, image uploads, listing management, review systems, and production-focused backend architecture using Node.js, Express, MongoDB, and EJS.",

    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "EJS",
      "Passport.js",
      "Cloudinary",
    ],

    image:
      "/projects/camellia.png",
    featured: true,

    github:
      "https://github.com/CODER-RAHUL9038/MAJOR_PROJECT/tree/main/CAMELLIA",

    live: "https://major-project-zz1b.onrender.com/listings",
    status: "Completed",
    overview: "A full-featured marketplace platform with robust booking and review systems.",
    features: [
      "Secure user authentication (Passport.js)",
      "Cloudinary image upload integration",
      "MVC architecture for backend scalability",
      "Interactive map and review systems"
    ],
    challenges: "Implementing a secure and intuitive multi-step listing process with complex validation.",
    learnings: "Deepened expertise in MVC patterns and secure server-side middleware integration."
  },
  {
    id: "xora-ai",
    title: "XORA AI",
    description:
      "Modern AI-powered interface focused on conversational experiences, markdown rendering, smooth animations, dynamic UI systems, and immersive frontend interactions.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Gemini API"],
    image: "/projects/xora.png",
    featured: true,
    github: "https://github.com/CODER-RAHUL9038/XORA.ai",
    live: "https://xora-ai-gamma.vercel.app/",
    status: "In Progress",
    overview: "Next-gen AI interface focusing on conversational flow and high-fidelity motion.",
    features: [
      "Streaming markdown rendering",
      "Context-aware AI conversational state",
      "Custom animation orchestrations",
      "Modular AI-UI generation components"
    ],
    challenges: "Crafting a streaming UI that feels instantaneous while processing heavy AI payloads.",
    learnings: "Advanced knowledge of React streaming patterns and AI prompt engineering."
  },

  {
    id: "dr-maya-reynolds",
    title: "Dr Maya Reynolds Website",
    description:
      "Professional responsive healthcare website redesign built with Next.js and Tailwind CSS, focused on calming UI design, clean typography systems, and high-performance architecture.",
    tech: ["Next.js", "React.js", "Tailwind CSS", "JavaScript", "Vercel"],
    image: "/projects/Maya.png",
    featured: true,
    github: "https://github.com/CODER-RAHUL9038/therapy-website-redesign",
    live: "https://dr-maya-reynolds-site-ten.vercel.app/",
    status: "Completed",
    overview: "Premium therapy website focused on accessibility and a calming user experience.",
    features: [
      "Accessibility-first navigation system",
      "Optimized LCP performance architecture",
      "Reusable component-based design system",
      "Automated booking workflow integration"
    ],
    challenges: "Achieving a 'calm' aesthetic while maintaining high technical performance and SEO scores.",
    learnings: "Refined skills in typography hierarchy and high-performance frontend engineering."
  },
  {
    id: "weather-app",
    title: "Weather App",
    description:
      "Real-time weather tracking application featuring dynamic backgrounds based on weather conditions, precise location-based forecasting, and a sleek, responsive glassmorphism UI.",
    tech: ["React.js", "OpenWeather API", "Tailwind CSS", "Lucide Icons"],
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    github: "https://github.com/CODER-RAHUL9038/PROJECTS/tree/main/react-project/weather-app",
    live: "https://weatherapp-gules-sigma-87.vercel.app/",
    status: "Completed",
    overview: "Dynamic meteorological dashboard with condition-based visual states.",
    features: [
      "Location-aware forecasting engine",
      "Dynamic theme shifting based on API data",
      "Glassmorphism UI dashboard",
      "Precise hourly and daily tracking"
    ],
    challenges: "Managing complex UI state transitions based on asynchronous weather data points.",
    learnings: "Mastered asynchronous state management and dynamic styling in React."
  },
  {
    id: "more-projects",
    title: "More Games & Projects",
    description:
      "Explore a wide collection of frontend experiments, JavaScript games, interactive UI components, API integrations, and production-grade development projects on GitHub.",
    tech: ["JavaScript", "React.js", "Next.js", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    github: "https://github.com/CODER-RAHUL9038/PROJECTS",
    live: "https://github.com/CODER-RAHUL9038/PROJECTS",
    status: "V2 Coming Soon",
    overview: "An open collection of engineering experiments and production utilities.",
    features: [
      "Custom game engine experiments",
      "Utility CLI tools in Python/Go",
      "Micro-interaction UI labs",
      "Open-source contribution templates"
    ],
    challenges: "Maintaining quality and consistency across a diverse range of technology stacks.",
    learnings: "Broadened technical horizons across multiple programming paradigms."
  },
];
