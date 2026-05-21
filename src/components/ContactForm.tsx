import { useState, FormEvent, ChangeEvent } from "react";
import { Send, MapPin, Mail, Sparkles, Check, Info } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorStatus("All fields are required. Please provide detailed inquiry details.");
      return;
    }

    setLoading(true);
    setErrorStatus(null);
    setSuccessStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to deliver contact inquiry.");
      }

      setSuccessStatus(data.message || "Thank you! Inquiry logged successfully.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || "An unexpected network failure occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      
      {/* Title block */}
      <div className="space-y-4 text-left">
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-white mb-2">
          Secure Contact Channel
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl">
          Submit pipeline invitations, contract consults, or production inquiries.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact Specs */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div className="space-y-6">
            <h3 className="text-2xl font-headline font-bold text-white leading-tight">
              Let's Discuss Your Target Product.
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed font-sans max-w-md">
              Whether you are architecting a new micro-service pipeline, migrating client-facing dashboards, or onboarding high-performance builders for your 2025 engineering cycle.
            </p>
          </div>

          {/* Quick Specifications list */}
          <div className="space-y-4 pt-2">
            {/* SLA Badge */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.01] border border-white/5 max-w-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider font-headline">Fast SLA Dispatch</p>
                <p className="text-xs text-gray-500 font-medium">Average Response Cycle: &lt; 24 hrs</p>
              </div>
            </div>

            {/* Email Spec */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.01] border border-white/5 max-w-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider font-headline">Inbox Direct</p>
                <p className="text-xs text-gray-400 font-mono select-all">rahulshaw.dev@nxerra.com</p>
              </div>
            </div>

            {/* Geography Spec */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.01] border border-white/5 max-w-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider font-headline">Location Specs</p>
                <p className="text-xs text-gray-400">Kolkata, West Bengal, India</p>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-gray-500 inline-flex items-center gap-1.5 pt-2 max-w-sm bg-white/[0.01] border border-white/5 px-4 py-2.5 rounded-lg">
            <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            Encryption layers active for payload transmissions.
          </div>
        </div>

        {/* Right Side: Interactive Submit Form */}
        <div className="lg:col-span-7 bg-black/40 border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
            
            {/* Input name */}
            <div className="space-y-2">
              <label htmlFor="name-input" className="text-[11px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
                Professional Name
              </label>
              <input
                id="name-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={loading}
                placeholder="Ex. Sarah Jenkins"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-sans text-white placeholder-gray-700 disabled:opacity-50"
              />
            </div>

            {/* Input email */}
            <div className="space-y-2">
              <label htmlFor="email-input" className="text-[11px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
                Professional Email
              </label>
              <input
                id="email-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
                placeholder="Ex. sarah@company.com"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-sans text-white placeholder-gray-700 disabled:opacity-50"
              />
            </div>

            {/* Input Message description */}
            <div className="space-y-2">
              <label htmlFor="message-input" className="text-[11px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
                Project brief or Description
              </label>
              <textarea
                id="message-input"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={loading}
                rows={5}
                placeholder="Provide a quick outline of requirements, timelines, or role scope details..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-sans text-white placeholder-gray-700 disabled:opacity-50 resize-y"
              ></textarea>
            </div>

            {/* Success message rendering block */}
            {successStatus && (
              <div className="p-4.5 rounded-2xl border border-green-500/20 bg-green-500/5 text-xs text-green-400 font-sans flex items-start gap-2.5 animate-scale-up">
                <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-semibold" />
                </div>
                <div>
                  <span className="font-bold block mb-0.5">Transmission Delivered Successfully</span>
                  {successStatus}
                </div>
              </div>
            )}

            {/* Error message rendering block */}
            {errorStatus && (
              <div className="p-4.5 rounded-2xl border border-red-500/20 bg-red-500/5 text-xs text-red-400 font-sans flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                  <span className="font-bold text-xs">!</span>
                </div>
                <div>
                  <span className="font-bold block mb-0.5">Validation Alert</span>
                  {errorStatus}
                </div>
              </div>
            )}

            {/* Action CTA Button Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4.5 rounded-2xl shadow-[0_10px_30px_rgba(59,130,246,0.15)] hover:shadow-[0_15px_45px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all text-center w-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Processing Transmission...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Project Brief
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
