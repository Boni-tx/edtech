"use client";

import { useState } from "react";
import { ClipboardList, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function CompleteProfileModal({
  show,
  dict,
}: {
  show: boolean;
  dict: Dictionary["professional"];
}) {
  const [dismissed, setDismissed] = useState(false);

  if (!show || dismissed) return null;

  function goToForm() {
    setDismissed(true);
    document.getElementById("dados-profissionais")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/40 px-6 backdrop-blur-sm"
      onClick={() => setDismissed(true)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-card-hover dark:bg-navy-900"
      >
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute right-4 top-4 text-navy-300 hover:text-navy-900 dark:text-navy-500 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-900/5 dark:bg-white/10">
          <ClipboardList className="h-7 w-7 text-navy-900 dark:text-white" />
        </div>

        <h2 className="text-lg font-bold text-navy-900 dark:text-white">{dict.modalTitle}</h2>
        <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">{dict.modalDescription}</p>

        <div className="mt-6 flex flex-col gap-2.5">
          <Button size="lg" className="w-full" onClick={goToForm}>
            {dict.modalCta}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDismissed(true)}>
            {dict.modalLater}
          </Button>
        </div>
      </div>
    </div>
  );
}
