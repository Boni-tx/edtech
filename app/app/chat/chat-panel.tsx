"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { MOCK_PROFESSORS } from "@/lib/mock/professors";
import { cn } from "@/lib/utils";

type Message = { from: "me" | "them"; text: string };

const INITIAL_MESSAGES: Record<string, Message[]> = {
  "1": [{ from: "them", text: "Oi! Podemos marcar a aula de Química pra essa semana." }],
  "2": [{ from: "them", text: "Beleza, te mando os exercícios de Matemática antes da aula." }],
};

export default function ChatPanel({
  placeholder,
  emptyLabel,
}: {
  placeholder: string;
  emptyLabel: string;
}) {
  const [activeId, setActiveId] = useState(MOCK_PROFESSORS[0].id);
  const [messagesByProfessor, setMessagesByProfessor] = useState(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");

  const activeProfessor = MOCK_PROFESSORS.find((p) => p.id === activeId)!;
  const messages = messagesByProfessor[activeId] ?? [];

  function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessagesByProfessor((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), { from: "me", text: draft.trim() }],
    }));
    setDraft("");
  }

  return (
    <div className="flex h-[calc(100%-3rem)] overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-card dark:border-white/10 dark:bg-navy-900">
      <div className="w-64 shrink-0 overflow-y-auto border-r border-navy-900/8 dark:border-white/10">
        {MOCK_PROFESSORS.map((professor) => (
          <button
            key={professor.id}
            onClick={() => setActiveId(professor.id)}
            className={cn(
              "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
              activeId === professor.id ? "bg-navy-50 dark:bg-white/5" : "hover:bg-navy-50/50 dark:hover:bg-white/5"
            )}
          >
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white",
                professor.gradient
              )}
            >
              {professor.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-navy-900 dark:text-white">{professor.name}</p>
              <p className="truncate text-xs text-navy-300 dark:text-navy-500">{professor.subject}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="border-b border-navy-900/8 px-5 py-3 dark:border-white/10">
          <p className="text-sm font-semibold text-navy-900 dark:text-white">{activeProfessor.name}</p>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {messages.length === 0 && (
            <p className="text-sm text-navy-300 dark:text-navy-500">{emptyLabel}</p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn("flex", msg.from === "me" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-xs rounded-2xl px-4 py-2 text-sm",
                  msg.from === "me"
                    ? "bg-navy-900 text-white dark:bg-white dark:text-navy-900"
                    : "bg-navy-50 text-navy-900 dark:bg-white/10 dark:text-white"
                )}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 border-t border-navy-900/8 p-4 dark:border-white/10"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={placeholder}
            className="h-11 flex-1 rounded-lg border border-navy-900/15 bg-white px-3.5 text-sm text-navy-900 outline-none focus-visible:border-navy-900/30 focus-visible:ring-2 focus-visible:ring-navy-900/15 dark:border-white/15 dark:bg-navy-800 dark:text-white dark:placeholder:text-navy-500"
          />
          <button
            type="submit"
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-900 text-white hover:bg-navy-700 dark:bg-white dark:text-navy-900 dark:hover:bg-navy-100"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
