import Link from "next/link";

export default function Topbar({ name, avatarUrl }: { name: string; avatarUrl: string | null }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-navy-900/8 bg-white px-8">
      <div className="flex items-center gap-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.png" alt="EdTech Marketplace" className="h-8 w-8 rounded-lg" />
        <span className="text-sm font-bold tracking-tight text-navy-900">EdTech Marketplace</span>
      </div>

      <h1 className="text-2xl tracking-tight text-navy-900">
        <span className="font-medium text-navy-300">Olá,</span>{" "}
        <span className="font-extrabold">{name}</span>
      </h1>

      <Link
        href="/app/perfil"
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-navy-900 text-sm font-bold text-white"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          initial
        )}
      </Link>
    </header>
  );
}
