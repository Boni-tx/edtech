"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, CalendarDays, History, MessageCircle, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/app", label: "Professores", icon: LayoutGrid },
  { href: "/app/calendario", label: "Calendário", icon: CalendarDays },
  { href: "/app/aulas", label: "Aulas", icon: History },
  { href: "/app/chat", label: "Chat", icon: MessageCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-20 shrink-0 flex-col items-center justify-between border-r border-navy-900/8 bg-white py-6">
      <div className="flex flex-col items-center gap-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                "flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded-xl transition-colors",
                active ? "bg-navy-900 text-white" : "text-navy-300 hover:bg-navy-50 hover:text-navy-900"
              )}
            >
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}

        <Link
          href="/demo-aula"
          title="Demonstração Solana"
          className={cn(
            "mt-4 flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded-xl transition-colors",
            pathname === "/demo-aula"
              ? "bg-confirm-500 text-white"
              : "text-confirm-600 hover:bg-confirm-500/10"
          )}
        >
          <Sparkles className="h-5 w-5" />
        </Link>
      </div>

      <Link
        href="/app/perfil"
        title="Configurações"
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
          pathname === "/app/perfil" ? "bg-navy-900 text-white" : "text-navy-300 hover:bg-navy-50 hover:text-navy-900"
        )}
      >
        <Settings className="h-5 w-5" />
      </Link>
    </aside>
  );
}
