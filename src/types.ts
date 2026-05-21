export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "AI Workflows" | "Databases" | "Tools";
  iconName: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  year: string;
  title: string;
  company?: string;
  subtitle: string;
  description: string;
  highlighted?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
}
