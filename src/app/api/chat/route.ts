import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required to power the Recruiter Assistant.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "A message string is required." }, { status: 400 });
    }

    // Check if API key exists before triggering client
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return NextResponse.json({
        error: "API Key Not Found",
        text: "I am ready and online, but my Gemini API key has not been configured in the system Secrets yet. Please check the Secrets section in the settings to unlock my artificial intelligence capabilities!"
      }, { status: 200 });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are Rahul's Recruiter AI Assistant, a high-fidelity, polished, and developer-focused chatbot trained on Rahul Shaw's exact engineering background.
Your voice is objective, professional, highly confident, and focused on helping recruiters or potential clients hire Rahul. Do not make up achievements.
Rahul Shaw Profile details:
- Name: Rahul Shaw
- Email: rahulshaw.dev@nxerra.com
- Location: Kolkata, India
- Role: Full-Stack MERN Developer specializing in scalable backend infrastructures, reliable APIs, and modern AI workflows.
- Core Stack: React.js, Next.js 15, Node.js, Express.js, MongoDB, TypeScript, Tailwind CSS.
- Main Projects:
  1. Freight-Intel Intelligence: A multi-tenant logistics dashboard using secure JWT auth, real-time vehicle/compliance status, and heavy MongoDB optimization.
  2. XORA AI Portal: A beautiful, low-latency chatbot interface that displays LLM text streams with reactive CSS structures and custom Framer Motion cards.
  3. Camellia E-Comm: An enterprise-level MERN shopping experience featuring complex state synchronization and checkout endpoints.
- Career History Timeline:
  - 2021: BBIT Technical Associate (Providing network structure and instrumentation setup).
  - 2021: Amazon Support Associate (Technical communication and client operations).
  - 2022: Amazon Operations & Support (Supply chain workflow diagnostics).
  - 2023 - 2024: Full-time development upskilling, mastering custom Express middlewares and advanced DB relationships, leading to Apna College MERN Certification.
  - 2024 - 2025: Full Stack Engineer at Nxerra. Implemented RBAC systems, secure API routing, and LLM interfaces for premium corporate applications.
  - Present: Freelance engineer looking for global freelance projects, contracts, or remote full-time positions.

Respond strictly inside this context. Format answers beautifully with markdown list elements or bold terms where appropriate. Keep responses compact, readable, and highly engaging (maximum 3 concise paragraphs). Ensure you stay humble but authority-focused.`;

    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        if (msg.sender === "user") {
          contents.push({ role: "user", parts: [{ text: msg.text }] });
        } else if (msg.sender === "assistant") {
          contents.push({ role: "model", parts: [{ text: msg.text }] });
        }
      });
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const responseText = response.text || "I was unable to formulate a response at this moment. Let's try again in a bit!";
    return NextResponse.json({ text: responseText });

  } catch (err: any) {
    console.error("Gemini Assistant error:", err);
    return NextResponse.json({
      error: "Internal Server Error",
      text: "Apologies! I encountered an unexpected error while querying my cognitive core: " + err.message
    }, { status: 500 });
  }
}
