import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rahul Shaw | Full-Stack Developer Portfolio",
  description: "A cinematic, premium AI-first developer portfolio website for Rahul Shaw, featuring an interactive experience timeline, custom glassmorphism effects, and a Next.js Gemini recruiter assistant chatbot.",
  keywords: [
    "Rahul Shaw",
    "MERN Stack Developer",
    "Full-Stack Developer",
    "Next.js Developer",
    "AI-assisted Workflows",
    "Kolkata",
    "React.js",
    "Node.js",
    "Express.js"
  ],
  authors: [{ name: "Rahul Shaw", url: "https://rahulshaw.dev" }],
  openGraph: {
    title: "Rahul Shaw | Full-Stack Developer Portfolio",
    description: "Cinematic, premium developer portfolio website featuring a Gemini-powered Recruiter AI Assistant chatbot, core stack insights, and professional evolution timeline.",
    type: "website",
    locale: "en_US",
    siteName: "Rahul Shaw Portfolio"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-[#050505]">
      <body className="antialiased text-[#e5e2e1] bg-[#050505] selection:bg-blue-500/30 selection:text-white min-h-screen relative">
        {children}
      </body>
    </html>
  );
}
