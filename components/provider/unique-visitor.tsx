"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visitor")
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch((err) => console.error("Failed to fetch visitor count:", err));
  }, []);

  return (
    <AnimatePresence mode="wait">
      {count !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100/50 px-3 py-1.5 backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800/50"
        >
          {/* Pulsing indicator - subtle visual detail */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>

          <p className="text-xs font-semibold tracking-tight text-neutral-600 dark:text-neutral-400">
            <span className="text-neutral-900 dark:text-neutral-100">
              {count.toLocaleString()}
            </span>
            <span className="ml-1 opacity-70">unique visitors</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
