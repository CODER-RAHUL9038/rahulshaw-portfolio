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
    "Tell me about Rahul's MERN experience",
    "What projects has Rahul built?",
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
    } catch (err: any) {
      console.error("Failed to fetch chat response:", err);
      setErrorMessage(
        err.message || "Apologies! There was a hiccup communicating with my server. Please try again."
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

  const headingVariants: Variants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
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
            <div className="overflow-hidden">
              <motion.h2 variants={headingVariants} className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                Rahul's Ai <br />
                Assistant
              </motion.h2>
            </div>
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
                      animate={{ 
                        opacity: [0.4, 1, 0.4], 
                        scale: [0.9, 1.2, 0.9],
                        boxShadow: [
                          "0 0 0px rgba(16,185,129,0)",
                          "0 0 12px rgba(16,185,129,0.6)",
                          "0 0 0px rgba(16,185,129,0)"
                        ]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-2.5 h-2.5 rounded-full bg-emerald-500"
                    ></motion.span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400/90 uppercase tracking-widest">Live Presence</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleResetChat}
                className="px-4 py-2 rounded-xl border border-white/[0.03] text-[#9ca3af]/60 hover:text-white hover:bg-white/5 hover:border-white/10 active:scale-95 transition-all text-[10px] flex items-center gap-1.5 font-bold uppercase tracking-widest"
                title="Reset Chat History"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>

            <div className="flex-grow overflow-y-auto py-6 space-y-6 pr-2 chatbot-scrollbar">
              <AnimatePresence initial={false} mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15, scale: 0.97, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[1.25rem] px-5 py-3.5 text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-none shadow-[0_10px_25px_-5px_rgba(59,130,246,0.3)]"
                          : "bg-[#16171a] border border-white/[0.05] text-[#e5e2e1] rounded-bl-none shadow-lg"
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
                  <div className="bg-[#16171a] border border-white/[0.05] rounded-[1.25rem] rounded-bl-none px-5 py-4 text-sm text-[#9ca3af] flex items-center gap-3 shadow-md">
                    <span className="flex gap-1.5">
                      <motion.span 
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        className="w-1.5 h-1.5 rounded-full bg-blue-400"
                      />
                      <motion.span 
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="w-1.5 h-1.5 rounded-full bg-blue-400"
                      />
                      <motion.span 
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        className="w-1.5 h-1.5 rounded-full bg-blue-400"
                      />
                    </span>
                    <span className="text-xs font-mono tracking-tight">Synthesizing Rahul's journey...</span>
                  </div>
                </motion.div>
              )}

              {errorMessage && (
                <div className="flex justify-center">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3 w-full text-xs text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-bold">Execution Error</div>
                      <p>{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {messages.length === 1 && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-6 space-y-4"
                >
                  <span className="text-[10px] font-bold text-[#6b7280] tracking-[0.2em] uppercase block pl-1">
                    Contextual Suggestions
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {suggestionPrompts.map((prompt, index) => (
                      <motion.button
                        key={prompt}
                        type="button"
                        whileHover={{ y: -2, scale: 1.02, borderColor: "rgba(59, 130, 246, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSendMessage(prompt)}
                        className={`inline-flex items-center text-xs text-[#9ca3af] hover:text-white bg-[#111214] border border-white/[0.06] px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer shadow-sm ${
                          index >= 3 ? "hidden md:inline-flex" : "inline-flex"
                        }`}
                      >
                        {prompt}
                      </motion.button>
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
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me: 'Is Rahul familiar with MongoDB?'"
                className="flex-grow bg-[#131416]/80 border border-white/[0.04] text-white px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-blue-500/50 transition-all font-sans"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="w-[52px] h-[52px] shrink-0 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-[0_4px_15px_rgba(59,130,246,0.25)] hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:opacity-30 disabled:bg-[#131416] disabled:shadow-none transition-all duration-300"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
