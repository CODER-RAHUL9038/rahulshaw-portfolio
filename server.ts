import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized GoogleGenAI client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in current environment variables. Configure it in settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Verification response to check system health
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Real-time Chat agent endpoint for Recruiter Assistant
app.post("/api/gemini/generate", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "No input message specified" });
    }

    const ai = getGeminiClient();

    // Prepare systemic background instructions reflecting verified resume data
    const systemInstruction = `You are 'Rahul's AI Assistant', a highly professional, skilled custom-trained conversational agent designed to help recruiters, potential employers, and clients evaluate Rahul Shaw's profile.

Rahul Shaw is a talented backend-heavy MERN (MongoDB, Express, React, Node.js) Full-Stack Engineer based in Kolkata, India. He specializes in scalable systems, bulletproof API services, and modern AI-assisted engineering workflows.

Here is the absolute source of truth regarding Rahul's background:
1. Core Tech Stack:
- Frontend: React.js, Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js, REST APIs & JWT secrets, GraphQL, Socket.io
- Databases: MongoDB, PostgreSQL, Redis
- Tools: Git, GitHub, Docker, Vite, Postman
- AI Workflows: Gemini API, Claude API, Prompt Engineering, Agentic Workflows

2. Professional Evolution (Timeline):
- 2021: Technical Associate at BBIT (Lab systems & instrumentation support). Managed infrastructure for laboratory computing systems.
- 2021: Amazon Support Associate (Customer operations). Optimized communication protocols, managed issue resolution.
- 2022: Amazon Operations & Support (Workflow & process coordination). supply chain workflows, systemic troubleshooting.
- 2023 - 2024: Upskilling & MERN Stack Development (Apna College MERN Certification). Intensive self-driven focus on mastering Node, Express, Mongo, React.
- 2024 - 2025: Ex-Nxerra | Full Stack Engineer (Secure APIs & AI-assisted workflows). Engineered multi-tenant dashboards, secure backend setups, RBAC systems, and API optimizations for enterprise clients.
- Present (2025): Freelance Developer (Open to Opportunities). Architecting custom web solutions for global clients while seeking a production-focused engineering role.

3. Featured Projects:
- Freight-Intel Intelligence: A multi-tenant logistics workspace with secure JWT authentication and real-time compliance tracking. Implements a React/Node architecture.
- XORA AI Portal: A high-fidelity AI portal interface optimized for low-latency LLM stream processing and dynamic UI state manipulation. Uses Claude API with Tailwind CSS.

Voice and Tone Guidelines:
- Professional, helpful, concise, structured, and humble yet highly skilled (the 'Quiet Authority' theme).
- Standard scannable bullets when describing details are preferred over dense prose blocks.
- Always refer to him as 'Rahul'.
- If a recruiter or user asks for details or skills not present in his timeline, respond politely that you only have access to verified portfolio facts.
- Answer confidently about his availability (active freelance projects, open to exceptional full-time or contract production-focused roles in 2025).
- Respond directly inside standard Markdown format.`;

    // Reconstruct conversation history safely
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    // Start Chat interface via @google/genai chats API
    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      // Seed with previous messages if chat is already active
      history: formattedHistory,
    });

    const response = await chatInstance.sendMessage({
      message,
    });

    return res.json({
      text: response.text || "I was unable to generate a detailed response. Please try again."
    });

  } catch (error: any) {
    console.error("Gemini route error:", error);
    return res.status(500).json({
      error: error.message || "An error occurred while calling the Gemini API. Ensure process.env.GEMINI_API_KEY is configured."
    });
  }
});

// Contact Enquiry endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please provide name, email, and description of your project." });
  }
  console.log(`[Contact Message Received] Name: ${name}, Email: ${email}, Msg: ${message}`);
  return res.json({
    success: true,
    message: "Thank you! Your project inquiry has been logged. Rahul will contact you shortly."
  });
});

// Serve frontend assets via Vite in development, or Static build output in production
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Initializing Express server in DEVELOPMENT mode with Vite integration...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving frontend files in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started and listening strictly on http://0.0.0.0:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error("Critical server bootstrap failure:", err);
});
