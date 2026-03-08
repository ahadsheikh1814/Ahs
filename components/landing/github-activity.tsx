"use client";

import React, { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

const GithubActivity = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check initial theme
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-5 rounded-lg border border-neutral-200 bg-neutral-50 p-4 sm:p-6 dark:border-neutral-700 dark:bg-neutral-800/40">
      <div className="overflow-x-auto">
        {mounted ? (
          <GitHubCalendar
            username="ahadsheikh1814"
            blockSize={12}
            blockMargin={4}
            fontSize={14}
            colorScheme={theme}
            theme={{
              light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
              dark: ["#262626", "#0e4429", "#006d32", "#26a641", "#39d353"],
            }}
          />
        ) : (
          <div className="flex h-32 items-center justify-center">
            <div className="text-neutral-400 dark:text-neutral-600">
              Loading activity...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubActivity;
