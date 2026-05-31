import React, { useState, useRef, useEffect } from "react";
import { Send, Terminal, Cpu, Clock, RefreshCw, AlertCircle, Sparkles } from "lucide-react";
import { ChatMessage } from "../../types";
import { motion, AnimatePresence, Variants } from "motion/react";

export default function RecruiterAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const textRevealVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  useEffect(() => {
    setMessages([
      {
        id: "init",
        sender: "assistant",
        text: "Hi, I’m Rahul’s RAG-powered AI recruiter assistant. I have real-time access to his full technical documentation, projects, and professional history to provide precise answers."
      }
    ]);
  }, []);

  useEffect(() => {
    if (messages.length > 1 || isLoading) {
      // Small delay to ensure DOM is updated before scrolling
      const timeoutId = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, isLoading]);

  const suggestionPrompts = [
    "Tell me more about Rahul",
    "Tell me about Rahul's MERN experience",
    "Explain Freight-Intel",
    "What technologies does Rahul use?",
    "Is Rahul available for freelance work?"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorMessage(null);
    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "user",
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const chatHistory = messages.slice(-6).map((msg) => ({
        sender: msg.sender,
        text: msg.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch response from backend.");
      }

      const assistantMsg: ChatMessage = {
        id: "msg-as-" + Date.now(),
        sender: "assistant",
        text: data.text
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Failed to fetch chat response:", error);
      setErrorMessage(
        error.message || "Apologies! There was a hiccup communicating with my server. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "init",
        sender: "assistant",
        text: "Hi, I’m Rahul’s RAG-powered AI recruiter assistant. I have real-time access to his full technical documentation, projects, and professional history to provide precise answers."
      }
    ]);
    setInputText("");
    setErrorMessage(null);
  };

  return (
    <section id="ai-agent" className="pt-16 pb-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.015] blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-center"
      >
        {/* Left column info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <motion.div variants={textRevealVariants} className="text-xs font-bold uppercase tracking-[0.25em] text-blue-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Ai chatbot
            </motion.div>
            <motion.h2 variants={textRevealVariants} className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
              Rahul's Ai <br />
              Assistant
            </motion.h2>
            <motion.p variants={textRevealVariants} className="text-[#9ca3af] leading-relaxed text-sm md:text-base font-sans">
              Need on-demand verification? Query my RAG-powered Gemini assistant to evaluate job alignment, technology choices, or professional highlights with dynamic portfolio context.
            </motion.p>
          </div>

          <motion.div variants={textRevealVariants} className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#0f1012]/40 border border-white/[0.04] rounded-2xl flex items-center gap-3">
              <Cpu className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <div className="text-[10px] text-[#9ca3af] font-mono uppercase tracking-wider">AI MODEL</div>
                <div className="text-xs font-bold text-white mt-0.5">Gemini 2.5 Flash</div>
              </div>
            </div>
            <div className="p-4 bg-[#0f1012]/40 border border-white/[0.04] rounded-2xl flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-[#9ca3af] font-mono uppercase tracking-wider">Status Indicator</div>
                <div className="text-xs font-bold text-white mt-0.5">Online & Stable</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right column: Chat workspace */}
        <motion.div variants={textRevealVariants} className="rounded-[2rem] border border-white/[0.05] bg-[#0c0d0f]/85 backdrop-blur-xl relative shadow-2xl h-[580px] md:h-[520px] flex flex-col overflow-hidden">
          <div className="flex-grow flex flex-col justify-between p-5 md:p-7 h-full overflow-hidden">
            <div className="flex justify-between items-center pb-4 border-b border-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-none font-heading">Recruiter Assistant</h4>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <motion.span 
                      animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                    ></motion.span>
                    <span className="text-[10px] font-mono font-medium text-emerald-400/80 uppercase tracking-tighter">Live</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleResetChat}
                className="px-3 py-1.5 rounded-lg border border-white/[0.03] text-[#9ca3af]/60 hover:text-white hover:bg-white/5 hover:border-white/10 active:scale-95 transition-all text-[10px] flex items-center gap-1.5 font-bold uppercase tracking-wider"
                title="Reset Chat History"
              >
                <RefreshCw className="w-3 h-3" />
                Reset
              </button>
            </div>

            <div className="flex-grow overflow-y-auto py-6 space-y-4 pr-2 chatbot-scrollbar">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)", scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none shadow-[0_4px_15px_rgba(59,130,246,0.15)]"
                          : "bg-[#131416]/90 border border-white/[0.04] text-[#e5e2e1] rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#131416]/90 border border-white/[0.04] rounded-2xl rounded-bl-none px-5 py-3.5 text-sm text-[#9ca3af] flex items-center gap-2.5">
                    <span className="flex gap-1">
                      <motion.span 
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-1.5 h-1.5 rounded-full bg-blue-400"
                      />
                      <motion.span 
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-blue-400"
                      />
                      <motion.span 
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                        className="w-1.5 h-1.5 rounded-full bg-blue-400"
                      />
                    </span>
                    <span className="text-xs font-mono">Analyzing Rahul's journey...</span>
                  </div>
                </motion.div>
              )}

              {errorMessage && (
                <div className="flex justify-center">
                  <div className="bg-red-500/15 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3 w-full text-xs text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-bold">Execution Interrupted</div>
                      <p>{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {messages.length === 1 && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4 space-y-3"
                >
                  <span className="text-[10px] font-bold text-[#9ca3af] tracking-[0.15em] uppercase block pl-1">
                    SUGGESTED QUESTIONS
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {suggestionPrompts.map((prompt, index) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleSendMessage(prompt)}
                        className={`items-center text-xs text-[#d1d5db] hover:text-white bg-[#0e0f10] hover:bg-[#151618] border border-white/[0.08] hover:border-blue-500/35 px-4.5 py-3 rounded-full transition-all duration-300 cursor-pointer shadow-sm active:scale-95 text-left ${
                          index >= 3 ? "hidden md:inline-flex" : "inline-flex"
                        }`}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex gap-2 pt-4 border-t border-white/[0.04] items-center"
            >
              <div className="flex-grow flex items-center bg-[#131416]/80 border border-white/[0.04] rounded-xl px-5 focus-within:border-blue-500/50 transition-all">
                {!inputText && !isLoading && (
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-px h-5 bg-blue-500/60 mr-1.5"
                  />
                )}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask me: anything about Rahul"
                  className="flex-grow bg-transparent border-none text-white py-4 text-sm focus:outline-none font-sans"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="w-[52px] h-[52px] shrink-0 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-[0_4px_15px_rgba(59,130,246,0.25)] hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:opacity-30 disabled:bg-[#131416] disabled:shadow-none transition-all duration-300"
                aria-label="Send Message"
                title="Send Message"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
      {/* Section Partition */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </section>
  );
}
