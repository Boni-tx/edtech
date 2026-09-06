"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, CalendarDays, History, MessageCircle, Settings, Sparkles, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type SidebarDict = Dictionary["sidebar"];

export default function Sidebar({ isProfessor, dict }: { isProfessor: boolean; dict: SidebarDict }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/app", label: dict.professors, icon: LayoutGrid },
    { href: "/app/calendario", label: dict.calendar, icon: CalendarDays },
    { href: "/app/aulas", label: dict.lessons, icon: History },
    { href: "/app/chat", label: dict.chat, icon: MessageCircle },
  ];

  return (
    <aside className="flex h-screen w-20 shrink-0 flex-col items-center justify-between border-r border-navy-900/8 bg-white py-6 dark:border-white/10 dark:bg-navy-900">
      <div className="flex flex-col items-center gap-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                "flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded-xl transition-colors",
                active
                  ? "bg-navy-900 text-white dark:bg-white dark:text-navy-900"
                  : "text-navy-300 hover:bg-navy-50 hover:text-navy-900 dark:text-navy-500 dark:hover:bg-white/5 dark:hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}

        <Link
          href="/demo-aula"
          title={dict.solanaDemo}
          className={cn(
            "mt-4 flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded-xl transition-colors",
            pathname === "/demo-aula"
              ? "bg-confirm-500 text-white"
              : "text-confirm-600 hover:bg-confirm-500/10"
          )}
        >
          <Sparkles className="h-5 w-5" />
        </Link>

        {isProfessor && (
          <Link
            href="/app/publicar"
            title={dict.publishProfile}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed transition-colors",
              pathname === "/app/publicar"
                ? "border-navy-900 bg-navy-900 text-white dark:border-white dark:bg-white dark:text-navy-900"
                : "border-navy-900/25 text-navy-500 hover:border-navy-900 hover:text-navy-900 dark:border-white/25 dark:text-navy-300 dark:hover:border-white dark:hover:text-white"
            )}
          >
            <Plus className="h-4 w-4" />
          </Link>
        )}
      </div>

      <Link
        href="/app/perfil"
        title={dict.settings}
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
          pathname === "/app/perfil"
            ? "bg-navy-900 text-white dark:bg-white dark:text-navy-900"
            : "text-navy-300 hover:bg-navy-50 hover:text-navy-900 dark:text-navy-500 dark:hover:bg-white/5 dark:hover:text-white"
        )}
      >
        <Settings className="h-5 w-5" />
      </Link>
    </aside>
  );
}
