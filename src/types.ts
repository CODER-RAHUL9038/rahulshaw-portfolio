export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  live?: string;
  featured: boolean;
  // Detailed fields for back-side of card
  overview?: string;
  features?: string[];
  challenges?: string;
  learnings?: string;
  status?: "Completed" | "In Progress" | "V2 Coming Soon";
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string; // Lucide icon name
}

export interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  tagline: string;
  description: string;
  highlighted?: boolean;
  details?: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
}
