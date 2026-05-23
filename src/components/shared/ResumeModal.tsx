import { X, Printer, Mail, MapPin, Globe, Terminal, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:relative print:-top-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md print:hidden"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[#0f1012] border border-brand-border w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh] print:max-h-none print:border-none print:shadow-none print:w-full print:bg-white print:text-black z-10"
          >
            {/* Modal Toolbar (hidden in print) */}
            <div className="flex justify-between items-center px-6 py-4 bg-[#161719] border-b border-white/5 print:hidden">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#9ca3af] flex items-center gap-2">
                <motion.span 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-blue-500"
                ></motion.span>
                Rahul_Shaw_Resume.pdf
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase px-4 py-2 rounded-lg transition-colors"
                  title="Print Resume or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/5 text-[#9ca3af] hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable/Readable Document Canvas */}
            <div className="flex-grow overflow-y-auto p-8 md:p-12 space-y-8 print:overflow-visible print:p-6 print:text-black">
              {/* Header Block */}
              <div className="border-b border-dashed border-[#252629] pb-6 print:border-gray-300">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-1.5">
                    <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white print:text-black">
                      RAHUL SHAW
                    </h1>
                    <p className="text-blue-400 font-mono text-sm uppercase tracking-widest font-bold print:text-blue-600">
                      Full-Stack MERN Developer
                    </p>
                  </div>
                  <div className="text-xs font-mono text-[#9ca3af] space-y-1 md:text-right print:text-gray-600">
                    <div className="flex items-center md:justify-end gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-500" />
                      <span>rahulshaw.dev@nxerra.com</span>
                    </div>
                    <div className="flex items-center md:justify-end gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span>Kolkata, India</span>
                    </div>
                    <div className="flex items-center md:justify-end gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-500" />
                      <span>https://github.com/rahulshaw-dev</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Statement */}
              <div className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400 print:text-blue-600">
                  Professional Summary
                </h2>
                <p className="text-sm text-[#9ca3af] leading-relaxed print:text-gray-700">
                  Backend-heavy MERN stack developer oriented toward API engineering, secure token authorizations (JWT/RBAC), and low-latency client state synchronization. Active practitioner of AI-assisted engineering and modern deployment scaling strategies.
                </p>
              </div>

              {/* Core Skills segment */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400 print:text-blue-600">
                  Core Technical Skills
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white uppercase tracking-wider print:text-black">Frontend</div>
                    <div className="text-xs text-[#9ca3af] print:text-gray-600">React.js, Next.js 15, Tailwind, HTML5, CSS3</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white uppercase tracking-wider print:text-black">Backend</div>
                    <div className="text-xs text-[#9ca3af] print:text-gray-600">Node.js, Express.js, Custom Middleware</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white uppercase tracking-wider print:text-black">Databases</div>
                    <div className="text-xs text-[#9ca3af] print:text-gray-600">MongoDB, Aggegrations, Schema Indexes</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white uppercase tracking-wider print:text-black">Utilities</div>
                    <div className="text-xs text-[#9ca3af] print:text-gray-600">TypeScript, Claude API, Auth JWT, Git, Docker</div>
                  </div>
                </div>
              </div>

              {/* Career Timeline segment */}
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400 print:text-blue-600">
                  Professional History
                </h2>

                <div className="space-y-6">
                  <div className="border-l border-brand-border pl-4 print:border-gray-300">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold text-white print:text-black">Full Stack Engineer</h3>
                      <span className="text-xs font-mono text-[#9ca3af] print:text-gray-500">2024 - 2025</span>
                    </div>
                    <div className="text-xs text-blue-400 font-mono mb-2 print:text-blue-600">Ex-Nxerra | Secure APIs & AI Systems</div>
                    <p className="text-xs text-[#9ca3af] leading-relaxed print:text-gray-700">
                      Engineered robust multi-tenant control panels and customized micro-APIs. Standardized client roles using strict Role-Based Access controls (RBAC) and implemented high-fidelity LLM streaming features.
                    </p>
                  </div>

                  <div className="border-l border-brand-border pl-4 print:border-gray-300">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold text-white print:text-black">Operations & Support Specialist</h3>
                      <span className="text-xs font-mono text-[#9ca3af] print:text-gray-500">2022</span>
                    </div>
                    <div className="text-xs text-blue-400 font-mono mb-2 print:text-blue-600">Amazon Ops Support | Workflow Coordination</div>
                    <p className="text-xs text-[#9ca3af] leading-relaxed print:text-gray-700">
                      Orchestrated daily logistics pipeline integrations and solved live technical operations bottlenecks in a highly-scaled throughput center.
                    </p>
                  </div>

                  <div className="border-l border-brand-border pl-4 print:border-gray-300">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold text-white print:text-black">Technical Support Associate</h3>
                      <span className="text-xs font-mono text-[#9ca3af] print:text-gray-500">2021</span>
                    </div>
                    <div className="text-xs text-blue-400 font-mono mb-2 print:text-blue-600">Amazon | Technical Resolution Operations</div>
                    <p className="text-xs text-[#9ca3af] leading-relaxed print:text-gray-700">
                      Moderated multi-tier user technical requests and refined communication processes within high-volume client ticketing channels.
                    </p>
                  </div>

                  <div className="border-l border-brand-border pl-4 print:border-gray-300">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold text-white print:text-black">Technical Associate</h3>
                      <span className="text-xs font-mono text-[#9ca3af] print:text-gray-500">2021</span>
                    </div>
                    <div className="text-xs text-blue-400 font-mono mb-2 print:text-blue-600">BBIT Network Systems | Support Associate</div>
                    <p className="text-xs text-[#9ca3af] leading-relaxed print:text-gray-700">
                      Managed multi-subnet local networking setups and facilitated lab computing storage systems maintenance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Block */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400 print:text-blue-600">
                  Certifications & Qualifications
                </h2>
                <div className="flex items-start gap-3 pl-4 border-l border-brand-border print:border-gray-300">
                  <Award className="w-5 h-5 text-blue-400 shrink-0 print:text-blue-600" />
                  <div>
                    <h4 className="text-sm font-bold text-white print:text-black">Apna College MERN Certification</h4>
                    <p className="text-xs text-[#9ca3af] print:text-gray-600">Completed intensive, 12-month mastery program in advanced MongoDB modeling, structured Express layers, Node servers, and responsive React SPA patterns.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Backdrop visual helper */}
            <div className="bg-[#161719] px-6 py-4 border-t border-white/5 flex justify-end gap-3 print:hidden">
              <button
                onClick={onClose}
                className="border border-[#252629] text-[#9ca3af] hover:text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white/5 active:scale-95 transition-all"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
