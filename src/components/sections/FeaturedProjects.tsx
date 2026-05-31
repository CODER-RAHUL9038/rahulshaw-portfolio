"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "../../data/projects";
import { Project } from "../../types";
import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  ExternalLink,
  ArrowUpRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { motion, useInView, Variants, useMotionValue, useSpring, useTransform } from "motion/react";

const flipTransition = {
  duration: 0.62,
  ease: [0.16, 1, 0.3, 1] as const,
};

const detailRevealVariants: Variants = {
  hidden: { opacity: 0, y: 5, filter: "blur(3px)" },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.18 + index * 0.035,
      duration: 0.36,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

function ProjectDetailBlock({
  title,
  children,
  index,
}: {
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={detailRevealVariants}
      className="space-y-2"
    >
      <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300/80">
        {title}
      </h4>
      {children}
    </motion.div>
  );
}

function ProjectFlipCard({
  project,
  variants,
  resetSignal,
}: {
  project: Project;
  variants: Variants;
  resetSignal: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const toggleCard = () => {
    setIsFlipped((current) => !current);
    handleMouseLeave();
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [resetSignal]);

  return (
    <motion.div
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-full [perspective:1300px] max-md:[perspective:1000px] ${
        isFlipped ? "z-20" : "z-0"
      }`}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ 
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: "preserve-3d"
        }}
        transition={flipTransition}
        className="relative h-full rounded-[2rem]"
      >
        <div
          role="button"
          tabIndex={0}
          aria-pressed={isFlipped}
          aria-label={`View details for ${project.title}`}
          onClick={toggleCard}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              toggleCard();
            }
          }}
          className="glass-card rounded-[2rem] overflow-hidden flex flex-col group h-full relative cursor-pointer outline-none [backface-visibility:hidden] focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
        >
          {/* Image Frame */}
          <div className="relative aspect-[16/10] overflow-hidden border-b border-brand-border bg-[#0a0a0a]">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent"></div>

            {/* Badge tags overlay */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              {project.tech.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono tracking-widest uppercase bg-black/50 border border-white/10 text-white/90 backdrop-blur-md"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Icon shortcuts overlay */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="w-10 h-10 rounded-xl bg-[#0f1012]/85 border border-white/5 flex items-center justify-center text-white hover:text-blue-400 hover:border-blue-500/50 hover:bg-black/85 transition-all text-xs"
                  title="GitHub Repository"
                >
                  <SiGithub className="w-5 h-5" />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  className="w-10 h-10 rounded-xl bg-[#0f1012]/85 border border-white/5 flex items-center justify-center text-white hover:text-blue-400 hover:border-blue-500/50 hover:bg-black/85 transition-all text-xs"
                  title="Live Deployment"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Text metadata content block */}
          <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
              </div>
              {/* Reduced project description font size to shrink card height */}
              <p className="text-[#9ca3af] leading-relaxed text-[13px] line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Technology pill list */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 items-center justify-between mt-auto">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-[#161719] border border-brand-border text-[#9ca3af]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {/* Top margin added for visual separation */}
              <span className="text-white hover:text-blue-400 font-bold text-[10px] uppercase flex items-center gap-1 group-hover:translate-x-1 transition-all mt-4">
                View Details
                <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </div>

        <div
          role="button"
          tabIndex={isFlipped ? 0 : -1}
          aria-label={`Return to ${project.title} summary`}
          onClick={toggleCard}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              toggleCard();
            }
          }}
          className="absolute inset-0 rounded-[2rem] overflow-hidden cursor-pointer outline-none [backface-visibility:hidden] [transform:rotateY(180deg)] focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
        >
          <div className="relative h-full rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(20,21,24,0.96),rgba(8,9,12,0.98))] shadow-[0_24px_70px_-36px_rgba(59,130,246,0.55)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(96,165,250,0.14),transparent_34%),radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.06),transparent_30%)]"></div>
            <motion.div
              animate={{ opacity: isFlipped ? [0.7, 1, 0.78] : 0.7 }}
              transition={{
                duration: 3.2,
                repeat: isFlipped ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-[2rem] border border-blue-300/10"
            ></motion.div>

            <motion.div
              initial="hidden"
              animate={isFlipped ? "visible" : "hidden"}
              className="relative z-10 h-full overflow-y-auto p-5 md:p-6 flex flex-col gap-4"
            >
              <motion.div
                custom={0}
                variants={detailRevealVariants}
                className="flex items-start justify-between gap-4 border-b border-white/10 pb-4"
              >
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300/15 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100">
                    <Sparkles className="h-3 w-3" />
                    {project.status}
                  </span>
                  <h3 className="font-heading text-xl font-extrabold text-white tracking-tight">
                    {project.title}
                  </h3>
                </div>
                <span className="shrink-0 rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white/80 transition-colors hover:text-blue-300">
                  <RotateCcw className="h-4 w-4" />
                </span>
              </motion.div>

              <ProjectDetailBlock title="Project Overview" index={1}>
                <p className="text-[12px] leading-relaxed text-[#c6cad1]">
                  {project.details.overview}
                </p>
              </ProjectDetailBlock>

              <ProjectDetailBlock title="Key Features" index={2}>
                <ul className="grid gap-1.5 text-[12px] leading-relaxed text-[#aeb4bf]">
                  {project.details.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-300/70"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </ProjectDetailBlock>

              <ProjectDetailBlock title="Technologies Used" index={3}>
                <div className="flex flex-wrap gap-1.5">
                  {project.details.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-white/10 bg-white/[0.045] px-2 py-1 text-[10px] font-mono text-[#c7ccd5]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </ProjectDetailBlock>

              <div className="grid gap-4 pt-1">
                <ProjectDetailBlock title="Engineering Challenges" index={4}>
                  <p className="text-[12px] leading-relaxed text-[#aeb4bf]">
                    {project.details.challenges}
                  </p>
                </ProjectDetailBlock>

                <ProjectDetailBlock title="What I Learned" index={5}>
                  <p className="text-[12px] leading-relaxed text-[#aeb4bf]">
                    {project.details.learnings}
                  </p>
                </ProjectDetailBlock>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const isProjectsInView = useInView(sectionRef, {
    amount: 0.05,
    once: false,
  });

  useEffect(() => {
    if (!isProjectsInView) {
      setResetSignal((current) => current + 1);
    }
  }, [isProjectsInView]);

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="pt-16 pb-28 px-6 max-w-7xl mx-auto relative"
    >
      {/* Background neon dust glow */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        variants={containerVariants}
        className="space-y-16"
      >
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="overflow-hidden">
            <motion.div
              variants={textRevealVariants}
              className="text-xs font-bold uppercase tracking-[0.25em] text-blue-500 font-sans"
            >
              Curated Showcases
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              variants={headingVariants}
              className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            >
              Featured Projects
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p
              variants={textRevealVariants}
              className="text-[#9ca3af] leading-relaxed text-base"
            >
              A selection of full-stack applications focused on backend systems,
              responsive interfaces, and real-world development workflows.
            </motion.p>
          </div>
        </div>

        {/* Project display index cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectFlipCard
              key={project.id}
              project={project}
              variants={textRevealVariants}
              resetSignal={resetSignal}
            />
          ))}
        </motion.div>
      </motion.div>
      {/* Section Partition */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </section>
  );
}
