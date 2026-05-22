import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const textRevealVariants = {
    hidden: { opacity: 0, y: 6, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-28 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-1/2 right-0 w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid lg:grid-cols-[0.80fr_1.2fr] gap-12 lg:gap-16 items-start"
      >
        {/* Left column text details */}
        <div className="space-y-8 lg:sticky lg:top-28">
          <div className="space-y-4">
            <motion.div variants={textRevealVariants} className="text-xs font-bold uppercase tracking-[0.25em] text-blue-500">
              Inquiries & Collabs
            </motion.div>
            <motion.h2 variants={textRevealVariants} className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
              Let's build <br />
              something great.
            </motion.h2>
            <motion.p variants={textRevealVariants} className="text-[#9ca3af] leading-relaxed text-sm md:text-base">
              I am actively seeking software consulting gigs, fast-paced contract developments, or Full-Stack Node/MERN engineering positions globally. Let's start the dialogue.
            </motion.p>
          </div>

          <motion.div variants={textRevealVariants} className="space-y-6 pt-4 border-t border-white/5">
            <a
              href="mailto:rahulshaw.dev@nxerra.com"
              className="flex items-center gap-4 group p-4 border border-brand-border bg-[#0f1012]/40 rounded-2xl hover:border-blue-500/30 hover:bg-[#0f1012] transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#9ca3af] font-mono uppercase tracking-wider">Email Address</div>
                <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">rahulshaw.dev@nxerra.com</div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 border border-brand-border bg-[#0f1012]/40 rounded-2xl">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#9ca3af] font-mono uppercase tracking-wider">Mailing Address</div>
                <div className="text-sm font-bold text-white">Kolkata, India</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right column form container */}
        <motion.div variants={textRevealVariants} className="p-8 rounded-[2.2rem] border border-brand-border bg-[#0f1012]/50 backdrop-blur-xl relative shadow-2xl">
          {submitSuccess ? (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl font-extrabold text-white tracking-tight">
                Message Received!
              </h3>
              <p className="text-[#9ca3af] max-w-sm text-sm">
                Thank you for reaching out. I've received your query and will get back to you within 24 business hours as Rahul.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="form-input-name" className="text-xs font-bold uppercase tracking-wider text-[#9ca3af]">
                  Your Full Name
                </label>
                <input
                  id="form-input-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#161719] border border-brand-border text-white px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-blue-500/50 focus:bg-pink-100/10 focus:ring-1 focus:ring-blue-500/50 transition-all font-sans"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="form-input-email" className="text-xs font-bold uppercase tracking-wider text-[#9ca3af]">
                  Email Address
                </label>
                <input
                  id="form-input-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. john@company.com"
                  className="w-full bg-[#161719] border border-brand-border text-white px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-blue-500/50 focus:bg-pink-100/10 focus:ring-1 focus:ring-blue-500/50 transition-all font-sans"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="form-input-message" className="text-xs font-bold uppercase tracking-wider text-[#9ca3af]">
                  Project Inquiry & Proposal
                </label>
                <textarea
                  id="form-input-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="What scope or technology stack are you planning?"
                  className="w-full bg-[#161719] border border-brand-border text-white px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-blue-500/50 focus:bg-pink-100/10 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none font-sans"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-2xl shadow-[0_10px_35px_rgba(59,130,246,0.2)] hover:shadow-[0_15px_45px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-300 min-w-[200px] w-full"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Dispatching Query...
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
