import { Skill, Project, Experience } from "./types";

export const SKILLS: Skill[] = [
  // Backend
  { name: "Node.js", category: "Backend", iconName: "Server" },
  { name: "Express.js", category: "Backend", iconName: "Settings" },
  { name: "REST APIs & jwt", category: "Backend", iconName: "Key" },
  { name: "GraphQL", category: "Backend", iconName: "GitMerge" },
  
  // Frontend
  { name: "React.js", category: "Frontend", iconName: "Cpu" },
  { name: "Next.js 15", category: "Frontend", iconName: "Globe" },
  { name: "Tailwind CSS", category: "Frontend", iconName: "Palette" },
  { name: "TypeScript", category: "Frontend", iconName: "Terminal" },

  // AI Workflows
  { name: "Gemini API", category: "AI Workflows", iconName: "Sparkles" },
  { name: "Claude API", category: "AI Workflows", iconName: "Brain" },
  { name: "Prompt Eng", category: "AI Workflows", iconName: "MessageSquareCode" },
  { name: "AI Agentic Workflows", category: "AI Workflows", iconName: "Zap" },

  // Databases
  { name: "MongoDB", category: "Databases", iconName: "Database" },
  { name: "PostgreSQL", category: "Databases", iconName: "Layers" },
  { name: "Redis", category: "Databases", iconName: "Activity" },

  // Tools
  { name: "Git & GitHub", category: "Tools", iconName: "Github" },
  { name: "Docker", category: "Tools", iconName: "Container" },
  { name: "Vite", category: "Tools", iconName: "Flame" },
  { name: "Postman", category: "Tools", iconName: "Send" }
];

export const CORE_STACK = [
  { name: "React.js", desc: "Interactive Component Views", icon: "Cpu" },
  { name: "Next.js 15", desc: "Server Actions & Router Layouts", icon: "Globe" },
  { name: "Node.js", desc: "Async Non-blocking Engine", icon: "Server" },
  { name: "Express.js", desc: "Secure API Server Framework", icon: "Zap" },
  { name: "MongoDB", desc: "NoSQL Flexible Data Store", icon: "Database" }
];

export const PROJECTS: Project[] = [
  {
    title: "Freight-Intel Intelligence",
    description: "Multi-tenant logistics platform with secure JWT architecture and real-time compliance tracking.",
    longDescription: "A massive, real-time logistics workspace enabling large enterprise transport agencies to manage shipments, verify freight payloads and compliance status, and authenticate multi-tenant operators utilizing custom cryptographic JWT cookies. Built utilizing React, Express, Node.js, and MongoDB.",
    tech: ["Next.js 15", "MongoDB", "Express", "JWT"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmGtnTvWmvYCLCQiqWbKhR-9_0S_QT39myTc3Q6z2rMKEPpbU7R9bopTxuLzzGz7Om4cUyJTwoOs-qz4k2gmvApPIV-xPHmcn2WPWsXnWvrTbojdtu0I8ZuOOh0vIyWDsALO-HZfNbW4SauX_5uQ_jOXB1DLRKLesUSqk6N9ZZr46eQ86hT7-6JydU7N2b3o_hVY7zDTbEDmlJPlWPTvMr5oPZfnr2dYEwox_3HvwIiUg_J_368HNc7rhjPfzvjSBQjDbxYkbvFyY",
    liveUrl: "https://freight-intel.example.com",
    githubUrl: "https://github.com/rahulshaw/freight-intel"
  },
  {
    title: "XORA AI Portal",
    description: "High-fidelity AI portal interface optimized for low-latency LLM stream processing and dynamic UI states.",
    longDescription: "A highly visual client console leveraging LLM stream orchestration for seamless chat, split-pane prompt engineering playgrounds, and live canvas generation. Implements responsive sidebars, customized dark mode visual presets, and robust client error management.",
    tech: ["Claude API", "Tailwind", "React.js", "Express"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc_bJtJdQz_q8fsJk537jluHc6MR8iWPXZoXyuINZO98gXeP9HumgmjcX16CMvigYjHq6AHqIZfBWir1Gct0Scu1EJ9NE5Hutjo2WkO0p2h7eFBnu1DVRNIe8UzfBPnG4cELptxE-8nudQz9dHOIl6rtUKejmE9rISpK_5kEd8vBs4MPu46C5C9DeHm7kwkhV1NBqY48kM8fZ1Yt9rfS-IT6eNMc_b_0n1oIMr0x1f6wTJei1vpQhW4r-MzndD6Yl_JaBvvHDINP0",
    liveUrl: "https://xora-portal.example.com",
    githubUrl: "https://github.com/rahulshaw/xora-ai"
  }
];

export const EVOLUTION: Experience[] = [
  {
    year: "2021",
    title: "Technical Associate | BBIT",
    subtitle: "LAB SYSTEMS & INSTRUMENTATION SUPPORT",
    description: "Managed infrastructure for laboratory computing systems and provided multi-tier technical support for institutional networks."
  },
  {
    year: "2021",
    title: "Amazon Support Associate",
    subtitle: "CUSTOMER OPERATIONS",
    description: "Optimized communication protocols and handled technical issue resolution within high-volume operational environments."
  },
  {
    year: "2022",
    title: "Amazon Operations & Support",
    subtitle: "WORKFLOW & PROCESS COORDINATION",
    description: "Advanced coordination of supply chain workflows and systemic troubleshooting in large-scale logistics operations."
  },
  {
    year: "2023 - 2024",
    title: "Upskilling & MERN Stack Development",
    subtitle: "APNA COLLEGE MERN CERTIFICATION",
    description: "Intensive focus on building production-focused web systems. Mastery of Node.js, Express, MongoDB, and modern React patterns."
  },
  {
    year: "2024 - 2025",
    title: "Ex-Nxerra | Full Stack Engineer",
    subtitle: "SECURE APIS & AI-ASSISTED WORKFLOWS",
    description: "Engineered multi-tenant dashboards and secure backend infrastructures. Implemented RBAC systems and API optimizations for enterprise clients.",
    highlighted: true
  },
  {
    year: "Present",
    title: "Freelance Developer",
    subtitle: "OPEN TO OPPORTUNITIES",
    description: "Architecting custom web solutions for global clients while seeking a production-focused engineering role for 2025."
  }
];
