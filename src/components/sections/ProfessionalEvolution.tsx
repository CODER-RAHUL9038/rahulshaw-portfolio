"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { experiences } from "../../data/experience";
import { Briefcase, MapPin, Milestone, Award, Star, GraduationCap } from "lucide-react";
import { motion, MotionValue, useScroll, useSpring, useTransform, Variants, AnimatePresence } from "motion/react";

function TimelineNode({
  isHighlighted,
  nodeCenter,
  progressHeight,
}: {
  isHighlighted: boolean;
  nodeCenter: number;
  progressHeight: MotionValue<number>;
}) {
  const [isReached, setIsReached] = useState(false);
  
  // Use a single listener instead of 5+ transforms to reduce MotionValue overhead
  useLayoutEffect(() => {
    const unsubscribe = progressHeight.on("change", (latest) => {
      const reached = latest >= nodeCenter - 1;
      if (reached !== isReached) {
        setIsReached(reached);
      }
    });
    return () => unsubscribe();
  }, [progressHeight, nodeCenter, isReached]);

  return (
    <div
      className={`w-[12px] h-[12px] rounded-full border-[2.5px] z-20 relative transition-all duration-500 ease-out will-change-transform ${
        isReached 
          ? "border-blue-400 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] scale-110" 
          : "border-white/10 bg-[#050505] shadow-none scale-100"
      }`}
      style={{
        borderColor: isHighlighted && !isReached ? "rgba(96, 165, 250, 1)" : undefined,
        backgroundColor: isHighlighted && !isReached ? "rgba(59, 130, 246, 1)" : undefined,
        boxShadow: isHighlighted && !isReached ? "0_0_20px_rgba(59,130,246,0.8)" : undefined,
      }}
    >
      <AnimatePresence>
        {isHighlighted && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 2.5 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-blue-500/20 -z-10"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProfessionalEvolution() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [nodeCenters, setNodeCenters] = useState<number[]>([]);
  const [lineTravel, setLineTravel] = useState(1);
  const [lineHeightPx, setLineHeightPx] = useState(1);

  const measureTimeline = useCallback(() => {
    const line = lineRef.current;
    if (!line) return;

    // Batch DOM reads to avoid layout thrashing
    const lineRect = line.getBoundingClientRect();
    const lineTop = lineRect.top;
    
    // Pre-calculate all node rects in one pass if possible, or at least minimize recalculations
    const centers = nodeRefs.current.map((node) => {
      if (!node) return 0;
      // Using offsetTop + height / 2 if they share a common ancestor could be faster,
      // but if layout is complex, getBoundingClientRect is safer. 
      // We minimize the damage by only reading, not writing in this loop.
      const nodeRect = node.getBoundingClientRect();
      return nodeRect.top + nodeRect.height / 2 - lineTop;
    });

    const lastCenter = centers[centers.length - 1] ?? 1;
    setNodeCenters(centers);
    setLineTravel(Math.max(lastCenter, 1));
    setLineHeightPx(Math.max(lineRect.height, 1));
  }, []);

  useLayoutEffect(() => {
    measureTimeline();

    const resizeObserver = new ResizeObserver(measureTimeline);
    if (timelineRef.current) resizeObserver.observe(timelineRef.current);
    if (lineRef.current) resizeObserver.observe(lineRef.current);

    window.addEventListener("resize", measureTimeline);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureTimeline);
    };
  }, [measureTimeline]);

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end center"],
  });
  const clampedTimelineProgress = useTransform(scrollYProgress, [0, 1], [0, 1], {
    clamp: true,
  });
  const nodeProgressStops = nodeCenters.map((center) =>
    Math.min(Math.max(center / lineHeightPx, 0), 1)
  );
  const lineHeight = useTransform(
    clampedTimelineProgress,
    [0, ...nodeProgressStops, 1],
    [0, ...nodeCenters, lineTravel],
    { clamp: true }
  );
  const smoothLineHeight = useSpring(lineHeight, {
    stiffness: 150,
    damping: 30,
    mass: 0.8,
    restDelta: 0.01,
  });

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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const getIcon = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes("nxerra")) return <Briefcase className="w-4 h-4 text-blue-400" />;
    if (r.includes("freelance")) return <Star className="w-4 h-4 text-amber-400" />;
    if (r.includes("apna college") || r.includes("upskilling")) return <GraduationCap className="w-4 h-4 text-cyan-400" />;
    if (r.includes("amazon")) return <Milestone className="w-4 h-4 text-orange-400" />;
    return <Award className="w-4 h-4 text-indigo-400" />;
  };

  return (
    <section id="experience" className="pt-16 pb-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/[0.015] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="overflow-hidden">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: "some" }}
              variants={headingVariants}
              className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            >
              Professional Evolution
            </motion.h2>
          </div>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: "some" }}
            variants={textRevealVariants}
            className="text-[#9ca3af] leading-relaxed text-sm md:text-base max-w-xl mx-auto font-sans"
          >
            Technical milestones and engineering growth.
          </motion.p>
        </div>

        {/* Alternate Timelines Frame */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Main vertical center timeline connector line */}
          <div ref={lineRef} className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/5 overflow-hidden">
             <motion.div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 origin-top will-change-transform"
                style={{ scaleY: clampedTimelineProgress, height: "100%" }}
             />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isHighlighted = exp.highlighted;
              return (
                <motion.div
                  key={exp.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: "some" }}
                  variants={textRevealVariants}
                  className={`relative flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-start md:items-center gap-0 md:gap-12 w-full ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Left Side Container (Displays card on even, empty block on odd) */}
                  <div className={`w-full pl-16 md:pl-0 order-2 md:order-1 ${isEven ? "md:text-right md:flex md:justify-end" : "hidden md:block"}`}>
                    {isEven && (
                      <div className={`w-full max-w-[520px] text-left glass-card p-6 md:p-7 rounded-3xl border transition-all duration-300 shadow-xl ${
                        isHighlighted 
                          ? "border-blue-500/40 bg-[#0e1115]/90 shadow-[0_8px_30px_rgba(59,130,246,0.12)] ring-1 ring-blue-500/20" 
                          : "border-white/[0.04] bg-[#0c0d0e]/60 hover:border-blue-500/25"
                      }`}>
                        <div className="flex flex-col gap-2.5">
                          <div className={`w-max px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase border ${
                            isHighlighted 
                              ? "bg-blue-500/20 text-blue-300 border-blue-500/35"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/15"
                          }`}>
                            {exp.year}
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="shrink-0">{getIcon(exp.role)}</span>
                            <h3 className="font-heading text-base md:text-lg font-bold text-white tracking-tight leading-tight">
                              {exp.role}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400/90 font-mono tracking-wide uppercase">
                            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span>{exp.company}</span>
                          </div>

                          <p className="text-xs md:text-[13px] text-[#9ca3af] leading-relaxed mt-1">
                            {exp.description}
                          </p>

                          {exp.details && exp.details.length > 0 && (
                            <ul className="mt-3.5 space-y-2 pt-3.5 border-t border-white/[0.03]">
                              {exp.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-[#9ca3af] leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Central Node Dot placement */}
                  <div
                    ref={(node) => {
                      nodeRefs.current[index] = node;
                    }}
                    className="absolute left-[25px] top-1/2 -translate-y-1/2 md:relative md:left-0 md:top-auto md:translate-x-0 md:translate-y-0 order-1 md:order-2 z-10 flex items-center justify-center"
                  >
                    <TimelineNode
                      isHighlighted={Boolean(isHighlighted)}
                      nodeCenter={nodeCenters[index] ?? 0}
                      progressHeight={smoothLineHeight}
                    />
                  </div>

                  {/* Right Side Container (Displays card on odd, empty block on even) */}
                  <div className={`w-full pl-16 md:pl-0 order-3 ${!isEven ? "md:text-left md:flex md:justify-start" : "hidden md:block"}`}>
                    {!isEven && (
                      <div className={`w-full max-w-[520px] text-left glass-card p-6 md:p-7 rounded-3xl border transition-all duration-300 shadow-xl ${
                        isHighlighted 
                          ? "border-blue-500/40 bg-[#0e1115]/90 shadow-[0_8px_30px_rgba(59,130,246,0.12)] ring-1 ring-blue-500/20" 
                          : "border-white/[0.04] bg-[#0c0d0e]/60 hover:border-blue-500/25"
                      }`}>
                        <div className="flex flex-col gap-2.5">
                          <div className={`w-max px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase border ${
                            isHighlighted 
                              ? "bg-blue-500/20 text-blue-300 border-blue-500/35"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/15"
                          }`}>
                            {exp.year}
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="shrink-0">{getIcon(exp.role)}</span>
                            <h3 className="font-heading text-base md:text-lg font-bold text-white tracking-tight leading-tight">
                              {exp.role}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400/90 font-mono tracking-wide uppercase">
                            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span>{exp.company}</span>
                          </div>

                          <p className="text-xs md:text-[13px] text-[#9ca3af] leading-relaxed mt-1">
                            {exp.description}
                          </p>

                          {exp.details && exp.details.length > 0 && (
                            <ul className="mt-3.5 space-y-2 pt-3.5 border-t border-white/[0.03]">
                              {exp.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-[#9ca3af] leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Section Partition */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </section>
  );
}
