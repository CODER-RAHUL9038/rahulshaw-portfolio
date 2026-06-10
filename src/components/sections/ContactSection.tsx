"use client";

import React, { useState } from "react";
import { SiGithub, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Mail, MapPin, Send, CheckCircle2, Globe } from "lucide-react";
import { m, Variants } from "motion/react";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.6 1.098-1.071 1.834-1.378.736-.308 1.533-.443 2.327-.396 3.703 0 4.384 2.438 4.384 5.607v6.058h-.01zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const textRevealVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    )
      return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message.");
      }

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Form submission error:", error);
      alert(
        error.message ||
          "Apologies! There was an error sending your message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="pt-10 pb-20 px-6 max-w-7xl mx-auto relative"
    >
      <div className="absolute top-1/2 right-0 w-[350px] h-[350px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <m.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        className="grid lg:grid-cols-[0.80fr_1.2fr] gap-12 lg:gap-16 items-start"
      >
        {/* Left column text details */}
        <div className="space-y-8 lg:sticky lg:top-28">
          <div className="space-y-4">
            <m.div
              variants={textRevealVariants}
              className="text-xs font-bold uppercase tracking-[0.25em] text-blue-500"
            >
              Inquiries & Hiring
            </m.div>
            <div className="overflow-hidden">
              <m.h2
                variants={headingVariants}
                className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1]"
              >
                Let's build <br />
                something great.
              </m.h2>
            </div>
            <m.p
              variants={textRevealVariants}
              className="text-[#9ca3af] leading-relaxed text-sm md:text-base"
            >
              I am actively seeking software consulting gigs, fast-paced
              contract developments, or Full-Stack Node/MERN engineering
              positions globally. Let's start the dialogue.
            </m.p>
          </div>

          <m.div
            variants={textRevealVariants}
            className="space-y-2 pt-4 border-t border-white/5"
          >
            <a
              href="mailto:rahulshaw903866@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group py-1.5 px-3 border border-brand-border bg-[#0f1012]/40 rounded-2xl hover:border-blue-500/30 hover:bg-[#0f1012] transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-[10px] text-[#9ca3af] font-mono uppercase tracking-wider">
                  Email Address
                </div>
                <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  rahulshaw903866@gmail.com
                </div>
              </div>
            </a>

            <div className="flex items-center gap-3 py-1.5 px-3 border border-brand-border bg-[#0f1012]/40 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-400">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-[10px] text-[#9ca3af] font-mono uppercase tracking-wider">
                  Mailing Address
                </div>
                <div className="text-sm font-bold text-white">
                  Kolkata, India
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 py-1.5 px-3 border border-brand-border bg-[#0f1012]/40 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400">
                <Globe className="w-4.5 h-4.5" />
              </div>
              <div className="flex gap-4">
                <a
                  href="https://github.com/CODER-RAHUL9038"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9ca3af] hover:text-blue-400 transition-colors"
                  title="GitHub"
                >
                  <SiGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rahulshaw-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9ca3af] hover:text-blue-400 transition-colors"
                  title="LinkedIn"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
                <a
                  href="mailto:rahulshaw903866@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9ca3af] hover:text-blue-400 transition-colors"
                  title="Email Direct"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/918240522820"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9ca3af] hover:text-emerald-400 transition-colors"
                  title="Chat on WhatsApp"
                  aria-label="Chat on WhatsApp"
                >
                  <SiWhatsapp className="w-5 h-5" />
                </a>
              </div>
            </div>
          </m.div>
        </div>

        {/* Right column form container */}
        <m.div
          variants={textRevealVariants}
          className="p-8 rounded-[2.2rem] border border-brand-border bg-[#0f1012]/50 backdrop-blur-xl relative shadow-2xl"
        >
          {submitSuccess ? (
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl font-extrabold text-white tracking-tight">
                Message Received!
              </h3>
              <p className="text-[#9ca3af] max-w-sm text-sm">
                Thank you for reaching out. I've received your query and will
                get back to you within 24 business hours as Rahul.
              </p>
            </m.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="form-input-name"
                  className="text-xs font-bold uppercase tracking-wider text-[#9ca3af]"
                >
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
                <label
                  htmlFor="form-input-email"
                  className="text-xs font-bold uppercase tracking-wider text-[#9ca3af]"
                >
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
                <label
                  htmlFor="form-input-message"
                  className="text-xs font-bold uppercase tracking-wider text-[#9ca3af]"
                >
                  Project Inquiry or Hiring
                </label>
                <textarea
                  id="form-input-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="What scope or technology stack are you planning?"
                  className="w-full bg-[#161719] border border-brand-border text-white px-5 py-4 rounded-xl text-base focus:outline-none focus:border-blue-500/50 focus:bg-pink-100/10 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none font-sans"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.name.trim() ||
                  !formData.email.trim() ||
                  !formData.message.trim()
                }
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-2xl shadow-[0_10px_35px_rgba(59,130,246,0.2)] hover:shadow-[0_15px_45px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-300 min-w-[200px] w-full"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <m.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Connecting you with Rahul...
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
        </m.div>
      </m.div>
      {/* Section Partition */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </section>
  );
}
