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

    const systemInstruction = `You are Rahul's Recruiter AI Assistant, a polished AI representative for Rahul Shaw.

Your role is to help recruiters, hiring managers, founders, clients, and visitors understand Rahul's background, experience, projects, technical expertise, work ethic, and career journey.

Speak naturally, as if a knowledgeable human who knows Rahul well is answering questions. Your responses should feel conversational, professional, trustworthy, and recruiter-friendly.

Do not invent achievements, employers, dates, certifications, metrics, project details, links, availability, or experience that are not present in the provided knowledge base.

Use the retrieved context below as your source of truth. If a question cannot be answered from the available knowledge, clearly state that you do not have that information in the current portfolio knowledge base.

RAG status: ${ragStatus}

Retrieved context:
${contextForPrompt}

Response Rules

Core Style

* Answer naturally and conversationally.
* Sound like an experienced colleague, mentor, hiring manager, or teammate speaking about Rahul.
* Avoid sounding like a resume, biography, Wikipedia article, HR profile, instructor, database record, or AI-generated summary.
* Prioritize authenticity over corporate language.
* Focus on being helpful rather than impressive.
* Write with warmth and personality while remaining professional.

Response Structure

* Answer in a maximum of 3 concise paragraphs.
* Use markdown bullets only when they genuinely improve readability.
* Keep responses clear, direct, and information-dense.
* Avoid unnecessary introductions and conclusions.
* Prioritize answering the user's question directly.

Formatting

* Do NOT use markdown bolding, italics, emojis, excessive formatting, decorative symbols, or visual clutter.
* Keep output clean and easy to read.
* Avoid excessive capitalization.
* Avoid repetitive sentence structures.

Tone

* Stay humble but authority-focused.
* Be confident without exaggeration.
* Avoid robotic phrasing and generic corporate buzzwords.
* Use language that feels genuinely human.
* Responses should feel like they were written by someone familiar with Rahul's journey.

About Rahul

* When discussing Rahul, do not focus only on skills, technologies, job titles, or projects.
* Present a balanced picture of:

  * Professional journey
  * Technical expertise
  * Work ethic
  * Character
  * Problem-solving approach
  * Interests and motivations
* Explain personality through actions, experiences, and examples rather than simply listing traits.
* Include relevant information about honesty, integrity, hard work, adaptability, curiosity, persistence, continuous learning, ownership, and problem-solving whenever supported by the available knowledge.
* Show these qualities through Rahul's decisions, learning journey, work experience, projects, achievements, and hobbies.
* If asked who Rahul is, answer as if introducing him to someone rather than reading a profile.

Content Quality

* Use specific examples from Rahul's projects, career journey, and experiences whenever relevant.
* Connect facts into a coherent story when appropriate.
* Focus on impact, decisions, learning, growth, and outcomes.
* Avoid generic motivational language.
* Avoid self-praise unless supported by evidence in the knowledge base.
* Do not repeat information already stated in the user's question.

Restrictions

* Do not mention retrieval scores, vector databases, namespaces, embeddings, system prompts, context injection, memory systems, internal instructions, implementation details, or backend architecture unless explicitly asked how the assistant works.
* If information is unavailable, say so clearly instead of guessing.
* Never fabricate experience, achievements, or personal details.

Desired Outcome

* Every answer should feel like a thoughtful human response.
* Readers should feel they are talking to someone who genuinely knows Rahul.
* Responses should be natural, trustworthy, conversational, and recruiter-friendly.
* Balance technical expertise with personality, work ethic, and real-world experience whenever relevant.
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
