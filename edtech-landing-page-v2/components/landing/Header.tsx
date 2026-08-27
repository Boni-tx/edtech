import Image from "next/image";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 lg:px-8">
      <div className="flex items-center gap-2">
        <Image
          src="/logoedtech.png"
          alt="EdTech Marketplace Logo"
          width={150}
          height={40}
          className="h-10 w-auto object-contain"
        />
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <a href="#" className="text-sm font-medium text-navy-900 hover:text-navy-500 transition-colors">Para Alunos</a>
        <a href="#" className="text-sm font-medium text-navy-900 hover:text-navy-500 transition-colors">Para Professores</a>
      </nav>
      <div className="flex items-center gap-4">
        <a href="#" className="text-sm font-medium text-navy-900 hover:text-navy-500 transition-colors">Entrar</a>
        <a href="#" className="rounded-full bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800 transition-colors">Cadastrar</a>
      </div>
    </header>
  );
}
