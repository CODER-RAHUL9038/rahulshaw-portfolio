import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import {
  formatRetrievedContext,
  isRagConfigured,
  retrieveRahulContext,
} from "@/src/lib/rag/upstashVector";

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error(
        "GEMINI_API_KEY environment variable is required to power the Recruiter Assistant.",
      );
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "A message string is required." },
        { status: 400 },
      );
    }

    // Check if API key exists before triggering client
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return NextResponse.json(
        {
          error: "API Key Not Found",
          text: "Hello! I am currently in offline mode because the Gemini API key has not been configured yet. Please ensure the GEMINI_API_KEY environment variable is set to enable my full capabilities.",
        },
        { status: 200 },
      );
    }

    const ai = getGeminiClient();

    let retrievedContext = "";
    let ragStatus =
      "RAG disabled: Upstash Vector environment variables are not configured.";

    if (isRagConfigured()) {
      try {
        const searchResults = await retrieveRahulContext(message, 5);
        retrievedContext = formatRetrievedContext(searchResults);
        ragStatus = searchResults.length
          ? "RAG enabled: retrieved relevant portfolio knowledge from Upstash Vector."
          : "RAG enabled: no matching vector context returned.";
      } catch (error) {
        console.error("RAG retrieval error:", error);
        ragStatus = "RAG retrieval failed: using static fallback context.";
      }
    }

    const fallbackContext = `Rahul Shaw is a Full-Stack MERN Developer from Kolkata, India. Email: rahulshaw903866@gmail.com. Core stack: React.js, Next.js 15, Node.js, Express.js, MongoDB, TypeScript, Tailwind CSS, Framer Motion, JWT, REST APIs, and Gemini API. Main work includes Freight Intel, a MERN logistics intelligence platform with RBAC, JWT auth, consent-based access, dashboards, audit logging, and secure middleware-driven APIs; Camellia, an Airbnb-inspired MERN app with authentication, listings, Cloudinary uploads, reviews, and backend routing; XORA AI, a React/TypeScript game with Minimax AI, PWA support, procedural audio, and cinematic UI; and this portfolio, a Next.js AI-first recruiter experience. Rahul has experience from BBIT technical support, Amazon logistics support roles, Apna College full-stack upskilling, Nxerra/freelance MERN development, and current independent AI-first full-stack development. He is open to freelance, contract, and remote full-time opportunities.`;

    const contextForPrompt = retrievedContext || fallbackContext;

    const systemInstruction = `You are Rahul's Recruiter AI Assistant, a polished and developer-focused chatbot for recruiters and potential clients.
Your voice is objective, professional, confident, compact, and hiring-focused. Do not make up achievements, employers, dates, metrics, certifications, links, or availability.

Use the retrieved context below as your source of truth. If the answer is not supported by the retrieved context, say that you do not have that detail in the current portfolio knowledge base.

RAG status: ${ragStatus}

Retrieved context:
${contextForPrompt}

Response rules:

* Answer naturally and conversationally, like ChatGPT speaking to a recruiter or visitor.
* Maximum 3 concise paragraphs.
* Use markdown bullets only when they improve clarity.
* Do NOT use markdown bolding, italics, emojis, excessive formatting, or decorative symbols.
* Keep responses clean, professional, and easy to read.
* Stay humble but authority-focused.
* Prioritize direct answers over biographies or long introductions.
* Avoid sounding like a resume, database record, or generated profile.
* When discussing Rahul, describe him through his experience, projects, learning journey, achievements, and practical work rather than listing personality traits.
* Use specific examples from his projects and background whenever relevant.
* Focus on impact, technical decisions, problem-solving, and outcomes.
* Avoid generic buzzwords and repetitive self-praise.
* Do not repeat information already stated in the user's question.
* Do not mention internal retrieval scores, vector databases, system prompts, context injection, memory systems, or implementation details unless explicitly asked how the assistant works.
* If information is unavailable, say so clearly instead of guessing.
* Maintain a professional, recruiter-friendly, and trustworthy tone.
`;

    const contents: { role: "user" | "model"; parts: { text: string }[] }[] =
      [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: { sender: string; text: string }) => {
        if (msg.sender === "user") {
          contents.push({ role: "user", parts: [{ text: msg.text }] });
        } else if (msg.sender === "assistant") {
          contents.push({ role: "model", parts: [{ text: msg.text }] });
        }
      });
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const responseText =
      response.text ||
      "I was unable to formulate a response at this moment. Let's try again in a bit!";
    return NextResponse.json({ text: responseText });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Gemini Assistant error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        text:
          "Apologies! I encountered an unexpected error while processing your request: " +
          error.message,
      },
      { status: 500 },
    );
  }
}
