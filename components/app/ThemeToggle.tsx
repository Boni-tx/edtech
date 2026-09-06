"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeToggle({
  labelLight,
  labelDark,
}: {
  labelLight: string;
  labelDark: string;
}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function setTheme(dark: boolean) {
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }

  return (
    <div className="inline-flex rounded-full border border-navy-900/12 p-1 dark:border-white/10">
      <button
        type="button"
        onClick={() => setTheme(false)}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
          !isDark ? "bg-navy-900 text-white" : "text-navy-500 dark:text-navy-300"
        )}
      >
        <Sun className="h-3.5 w-3.5" />
        {labelLight}
      </button>
      <button
        type="button"
        onClick={() => setTheme(true)}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
          isDark ? "bg-navy-900 text-white" : "text-navy-500 dark:text-navy-300"
        )}
      >
        <Moon className="h-3.5 w-3.5" />
        {labelDark}
      </button>
    </div>
  );
}
