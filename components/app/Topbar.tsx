import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Topbar({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-navy-900/8 bg-white px-8">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900 text-white">
          <GraduationCap className="h-4.5 w-4.5" />
        </div>
        <span className="text-sm font-bold tracking-tight text-navy-900">EdTech Marketplace</span>
      </div>

      <h1 className="text-xl font-bold tracking-tight text-navy-900">Olá, {name}</h1>

      <Link
        href="/app/perfil"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white"
      >
        {initial}
      </Link>
    </header>
  );
}
