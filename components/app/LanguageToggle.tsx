"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/dictionaries";

export default function LanguageToggle({ locale }: { locale: Locale }) {
  const router = useRouter();

  function setLocale(next: Locale) {
    document.cookie = `locale=${next}; path=/; max-age=31536000`;
    router.refresh();
  }

  return (
    <div className="inline-flex rounded-full border border-navy-900/12 bg-white p-1 shadow-card dark:border-white/10 dark:bg-navy-800">
      <button
        type="button"
        onClick={() => setLocale("pt")}
        className={cn(
          "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
          locale === "pt" ? "bg-navy-900 text-white" : "text-navy-500 dark:text-navy-300"
        )}
      >
        Português
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
          locale === "en" ? "bg-navy-900 text-white" : "text-navy-500 dark:text-navy-300"
        )}
      >
        English
      </button>
    </div>
  );
}
