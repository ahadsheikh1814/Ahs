"use client";

import React, { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

type Theme = "light" | "dark";

interface ThemeColors {
  light: string[];
  dark: string[];
}

const GithubActivity: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState<boolean>(false);

  const themeColors: ThemeColors = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#262626", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  const scrollbarStyles = {
    scrollbarWidth: "thin" as const,
    scrollbarColor:
      theme === "dark" ? "#404040 transparent" : "#d4d4d4 transparent",
  };

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
      <div
        className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300 hover:[&::-webkit-scrollbar-thumb]:bg-neutral-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 dark:hover:[&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-track]:bg-transparent"
        style={scrollbarStyles}
      >
        {mounted ? (
          <GitHubCalendar
            username="ahadsheikh1814"
            blockSize={12}
            blockMargin={4}
            fontSize={14}
            colorScheme={theme}
            theme={themeColors}
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
