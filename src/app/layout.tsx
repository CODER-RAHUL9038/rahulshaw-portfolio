import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { LazyMotion, domAnimation } from "motion/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const baseUrl = "https://rahul-shaw-ai-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Rahul Shaw | AI-Integrated Full Stack Developer & MERN Specialist",
    template: "%s | Rahul Shaw",
  },
  description:
    "Production-focused Full Stack Developer specializing in Next.js, MERN stack, and AI-integrated web systems. Building scalable, secure, and high-performance applications with a focus on engineering excellence.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "Rahul Shaw",
    "Full Stack Developer",
    "Next.js Developer",
    "MERN Stack Developer",
    "AI Developer",
    "Generative AI Developer",
    "React Developer",
    "Node.js Developer",
    "Express.js",
    "MongoDB Specialist",
    "TypeScript",
    "Software Engineer Portfolio",
    "Kolkata Web Developer",
    "Freelance Full Stack Developer",
    "AI-Augmented Workflows",
    "Scalable Web Systems",
  ],
  authors: [{ name: "Rahul Shaw", url: baseUrl }],
  creator: "Rahul Shaw",
  openGraph: {
    title: "Rahul Shaw | AI-Integrated Full Stack Developer",
    description:
      "Modern developer portfolio showcasing scalable MERN applications, AI-assisted workflows, and production-level engineering projects.",
    url: baseUrl,
    siteName: "Rahul Shaw Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Rahul Shaw Portfolio - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Shaw | AI-Integrated Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, MERN, and AI-integrated systems. Check out my latest projects and engineering work.",
    images: ["/og.png"],
    creator: "@rahulshaw_dev", // Assuming a handle or placeholder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "48yHpWSdMJ2clhC3mO1nA0JV63ndWj03n5_BsTzxneU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Rahul Shaw",
        "jobTitle": "Full Stack Developer",
        "url": baseUrl,
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuD79pwVB9xieOO1DQzVI0qnn27GHQNS7haldVjSKK_PUjKMOGa09VMagxeylvTTka0WTcGIXEuvTNZ8yPYrlztTgnfLLQb4ILOoifErYEwPLOdTU1beq5nO_XGtPHCvq_piWCmT2ylp2qIyiH1ltP2LMDHvPnk0jfw8-u7oe7kuqkx1EvCJDOCsy-3egtpYLpJL3GiWUSpCO6jmk3Ri8ivldIntKRg5EU5zkd84KzECKV4mILw959R-Huc5POPDqhKaRTVk1RoXpkE",
        "sameAs": [
          "https://github.com/CODER-RAHUL9038",
          "https://www.linkedin.com/in/rahulshaw-dev",
        ],
        "description": "AI-Integrated Full Stack Developer specializing in Next.js and the MERN stack.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kolkata",
          "addressRegion": "West Bengal",
          "addressCountry": "India"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Rahul Shaw Portfolio",
        "description": "Professional portfolio of Rahul Shaw, Full Stack Developer.",
        "publisher": { "@id": `${baseUrl}/#person` }
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        "url": baseUrl,
        "name": "Rahul Shaw - Full Stack Developer Portfolio",
        "isPartOf": { "@id": `${baseUrl}/#website` },
        "about": { "@id": `${baseUrl}/#person` },
        "description": "Explore the projects and experience of Rahul Shaw, a Full Stack Developer specializing in AI-integrated web applications."
      }
    ]
  };

  return (
    <html lang="en" className={`scroll-smooth bg-[#050505] ${inter.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased text-[#e5e2e1] bg-[#050505] selection:bg-blue-500/30 selection:text-white min-h-screen relative overflow-x-hidden">
        <LazyMotion features={domAnimation} strict>
          {children}
        </LazyMotion>
      </body>
    </html>
  );
}