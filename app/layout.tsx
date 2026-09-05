import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EdTech Marketplace — Reforço escolar sob demanda",
  description:
    "Encontre um professor particular para tirar dúvidas hoje. Pagamento protegido, aula por vídeo integrada, sem mensalidade.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="bg-canvas font-sans text-navy-900 antialiased">
        {children}
      </body>
    </html>
  );
}
