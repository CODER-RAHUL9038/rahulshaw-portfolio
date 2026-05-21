import { useState, useRef, useEffect, FormEvent } from "react";
import { Send, Terminal, Sparkles, MessageSquare, AlertCircle } from "lucide-react";
import { ChatMessage } from "../types";

const SUGGESTIONS = [
  "Tell me about Rahul’s MERN experience",
  "What projects has Rahul built?",
  "Explain Freight-Intel",
  "What technologies does Rahul use?",
  "Is Rahul available for freelance work?"
];

export default function RecruiterAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-welcome",
      role: "model",
      text: "Hello! I'm trained on Rahul's verified resume and portfolio. Ask me any technical questions about his tech stack, timeline achievements, or project architectures!"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (rawMessage: string) => {
    if (!rawMessage.trim() || isLoading) return;

    setErrorStatus(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: rawMessage
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Package conversation history to keep model context intact
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: rawMessage,
          history: messages.map((m) => ({ role: m.role, text: m.text }))
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to trigger conversational agent stream. Verify backend server is alive.");
      }

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: "model",
        text: data.text
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error("Chat agent error:", err);
      setErrorStatus(err.message || "Connection timed out fetching model completion. Check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      
      {/* Outer Bento wrapper card */}
      <div className="glass-card rounded-[3rem] p-8 md:p-16 relative overflow-hidden bg-black/40 border border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full -mr-24 -mt-24 pointer-events-none"></div>

        <div className="grid lg:grid-cols-12 gap-12 items-center w-full relative z-10">
          
          {/* Left Description Copy */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-white leading-tight">
                Recruiter <br />
                <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                  Assistant
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed font-sans">
                Ask my custom-trained agent technical questions about my portfolio, tech stack, or engineering experience for an immediate deep-dive.
              </p>
            </div>

            {/* Glowing online chip badge */}
            <div className="flex items-center gap-3 text-blue-400 font-bold border border-blue-500/10 w-fit px-4 py-2 bg-blue-500/5 rounded-full text-xs uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Agent v2.5 Online
            </div>
          </div>

          {/* Right Chat Terminal Dashboard */}
          <div className="lg:col-span-7 w-full max-w-xl mx-auto flex flex-col bg-black/80 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl min-h-[500px]">
            
            {/* Terminal Header */}
            <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-inner">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white uppercase tracking-wider font-headline">Rahul's AI Assistant</p>
                  <p className="text-[10px] text-blue-400 flex items-center gap-1 font-mono uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
                    Ready to Assist
                  </p>
                </div>
              </div>
              <Terminal className="text-gray-500 text-sm w-4 h-4" />
            </div>

            {/* Terminal Message Log */}
            <div
              ref={containerRef}
              className="flex-1 p-6 space-y-6 max-h-[380px] overflow-y-auto font-sans text-sm scrollbar-thin"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-1 max-w-[85%] text-left ${
                    msg.role === "user" ? "ml-auto" : "mr-auto"
                  }`}
                >
                  <span className="text-[9.5px] uppercase font-mono tracking-widest text-gray-500 ml-1">
                    {msg.role === "user" ? "Recruiter" : "AI Assistant"}
                  </span>
                  <div
                    className={`rounded-2xl p-4 leading-relaxed border ${
                      msg.role === "user"
                        ? "bg-blue-600/10 text-white border-blue-500/20"
                        : "bg-white/[0.03] text-gray-300 border-white/5"
                    }`}
                  >
                    {/* Render message with linebreaks preserved */}
                    <div className="whitespace-pre-line text-sm">{msg.text}</div>
                  </div>
                </div>
              ))}

              {/* Suggestions Panel (only rendered initially or statically) */}
              {messages.length === 1 && (
                <div className="space-y-3 pt-2 text-left">
                  <p className="text-[10px] text-gray-500 uppercase font-bold ml-1 tracking-widest flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                    Example Prompts click to query:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSendMessage(suggestion)}
                        disabled={isLoading}
                        className="text-[11px] bg-white/[0.02] border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 px-4.5 py-2.5 rounded-xl text-left text-gray-300 hover:text-white transition-all cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Floating Error feedback */}
              {errorStatus && (
                <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-400 leading-relaxed font-sans flex items-start gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                  <div>
                    <span className="font-bold block mb-0.5">Model Request Failed</span>
                    {errorStatus}
                  </div>
                </div>
              )}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-2 items-center text-gray-400 text-xs italic bg-white/[0.02] border border-white/5 w-fit px-4 py-2.5 rounded-full mr-auto">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-dot-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-dot-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-dot-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span className="ml-1 select-none font-mono text-[10px] uppercase tracking-wider">Assistant is thinking...</span>
                </div>
              )}
            </div>

            {/* Prompt Input Block */}
            <div className="p-4 bg-white/[0.01] border-t border-white/5">
              <form onSubmit={handleFormSubmit} className="relative group">
                {/* Cybersecurity prompt prefix */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                  <span className="text-blue-500 text-sm font-code font-extrabold group-focus-within:animate-pulse">&gt;</span>
                  <span className="typing-cursor ml-1"></span>
                </div>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type an inquiry about Rahul Shaw..."
                  disabled={isLoading}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-12 py-4 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-mono text-white placeholder-gray-600 disabled:opacity-50"
                />

                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400 disabled:opacity-30 disabled:hover:scale-100 disabled:text-gray-600 transition-all cursor-pointer p-2 rounded-xl"
                  aria-label="Send user query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
