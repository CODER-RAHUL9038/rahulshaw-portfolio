import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rahul Shaw's Portfolio",
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  description:
    "Premium full-stack developer portfolio showcasing scalable MERN applications, secure APIs, AI-assisted workflows, and production-focused engineering.",

  keywords: [
    "Rahul Shaw",
    "Backend Developer",
    "MERN Stack Developer",
    "Full-Stack Developer",
    "Next.js Developer",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "TypeScript",
    "Tailwind CSS",
    "AI-assisted Workflows",
    "Kolkata Developer",
    "Freelance Developer",
  ],

  authors: [
    {
      name: "Rahul Shaw",
    },
  ],

  creator: "Rahul Shaw",

  openGraph: {
    title: "Rahul Shaw's Portfolio",

    description:
      "Modern developer portfolio showcasing scalable MERN applications, backend-focused engineering, AI-assisted workflows, and interactive project experiences.",

    type: "website",

    locale: "en_US",

    siteName: "Rahul Shaw Portfolio",
  },

  twitter: {
    card: "summary_large_image",

    title: "Rahul Shaw's Portfolio",

    description:
      "Premium full-stack developer portfolio with scalable MERN applications, secure APIs, and AI-assisted workflows.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-[#050505]">
      <body className="antialiased text-[#e5e2e1] bg-[#050505] selection:bg-blue-500/30 selection:text-white min-h-screen relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}