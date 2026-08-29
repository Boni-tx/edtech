// MOCK — links serão apontados para rotas reais quando existirem
const links = [
  { label: "Sobre", href: "#" },
  { label: "Termos de Uso", href: "#" },
  { label: "Privacidade", href: "#" },
  { label: "Contato", href: "#" },
  { label: "Trabalhe Conosco (Professores)", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-navy-900/8 px-6 py-10 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm font-semibold text-navy-900">
          EdTech Marketplace
        </p>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-navy-500 transition-colors hover:text-navy-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-navy-300">
          &copy; {new Date().getFullYear()} EdTech Marketplace. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
}
