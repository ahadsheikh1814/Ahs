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
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100/50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm w-fit"
        >
          {/* Pulsing indicator - subtle visual detail */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
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