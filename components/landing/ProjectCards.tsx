"use client";

import { cn } from "@/lib/utils";
import { IconBrandGithub, IconWorldWww } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useState, useId } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
  title: string;
  description: string;
  imgUrl: string;
  LandImg: string;
  tech: string[];
  link: string;
  GitDir?: string;
  meta?: string;
}

interface ProjectCardsProps {
  projects?: Project[];
  defaultOpen?: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE = [0.32, 0.72, 0, 1] as const;

// ─── Accordion Item ───────────────────────────────────────────────────────────

function AccordionItem({
  project,
  index,
  isOpen,
  isLast,
  onToggle,
}: {
  project: Project;
  index: number;
  isOpen: boolean;
  isLast: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const headerId = useId();

  return (
    <div className={cn(!isLast && "border-b border-neutral-100 dark:border-neutral-800")}>
      {/* Trigger */}
      <button
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="group/btn relative flex w-full items-center gap-3 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-600"
      >
        {/* Index */}
        <span
          className={cn(
            "w-5 shrink-0 text-[11px] tabular-nums transition-colors duration-200",
            isOpen
              ? "text-neutral-400 dark:text-neutral-500"
              : "text-neutral-300 dark:text-neutral-600",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Logo */}
        <div
          className={cn(
            "h-6 w-6 shrink-0 overflow-hidden rounded border transition-all duration-200",
            isOpen
              ? "border-neutral-200 dark:border-neutral-700"
              : "border-neutral-100 opacity-60 group-hover/btn:opacity-100 dark:border-neutral-800",
          )}
        >
          <Image
            src={project.imgUrl}
            alt=""
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Title */}
        <span
          className={cn(
            "flex-1 text-sm font-medium tracking-tight transition-colors duration-200",
            isOpen
              ? "text-neutral-900 dark:text-neutral-100"
              : "text-neutral-500 group-hover/btn:text-neutral-900 dark:text-neutral-400 dark:group-hover/btn:text-neutral-100",
          )}
        >
          {project.title}
        </span>

        {/* Meta — fades out when open */}
        <AnimatePresence mode="wait">
          {!isOpen && project.meta && (
            <motion.span
              key="meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="hidden text-[11px] text-neutral-400 sm:block dark:text-neutral-600"
            >
              {project.meta}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Plus / minus indicator */}
        <span
          className={cn(
            "relative ml-1 h-4 w-4 shrink-0 text-neutral-400 transition-colors duration-200 dark:text-neutral-600",
            "group-hover/btn:text-neutral-700 dark:group-hover/btn:text-neutral-300",
          )}
          aria-hidden="true"
        >
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: isOpen ? 1 : 0, rotate: isOpen ? 0 : -90 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
              <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.span>
        </span>
      </button>

      {/* Panel */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.36, ease: EASE }}
        style={{ overflow: "hidden" }}
      >
        <div className="pb-5 pl-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
            {/* Screenshot */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.3, delay: isOpen ? 0.08 : 0, ease: EASE }}
              className="sm:col-span-3"
            >
              <div className="overflow-hidden rounded-md border border-neutral-100 dark:border-neutral-800">
                <Image
                  src={project.LandImg}
                  alt={`${project.title} preview`}
                  width={1200}
                  height={675}
                  className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.3, delay: isOpen ? 0.13 : 0, ease: EASE }}
              className="flex flex-col gap-3 sm:col-span-2"
            >
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {project.description}
              </p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-neutral-500 dark:bg-neutral-800/80 dark:text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-auto flex gap-2 pt-1">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-all duration-150",
                    "bg-neutral-900 text-white hover:bg-neutral-700",
                    "dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300",
                  )}
                >
                  <IconWorldWww className="h-3.5 w-3.5" />
                  Website
                </a>
                {project.GitDir && (
                  <a
                    href={project.GitDir}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-all duration-150",
                      "border border-neutral-200 bg-transparent text-neutral-600 hover:bg-neutral-50",
                      "dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800",
                    )}
                  >
                    <IconBrandGithub className="h-3.5 w-3.5" />
                    Source
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const ProjectCards = ({ projects = [], defaultOpen = 0 }: ProjectCardsProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(
    projects.length > 0 ? defaultOpen : null,
  );

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  if (!projects.length) return null;

  return (
    <div className="mt-5 rounded-lg bg-neutral-50 p-4 sm:p-6 shadow-ahs dark:bg-neutral-800/40">
      {projects.map((project, i) => (
        <AccordionItem
          key={project.title}
          project={project}
          index={i}
          isOpen={openIndex === i}
          isLast={i === projects.length - 1}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
};

export default ProjectCards;