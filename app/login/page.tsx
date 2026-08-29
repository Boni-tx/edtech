"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, GraduationCap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleIcon from "@/components/ui/google-icon";
import { cn } from "@/lib/utils";

type Tab = "login" | "signup";
type Role = "aluno" | "professor";

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [role, setRole] = useState<Role>("aluno");

  // --- Handlers vazios, prontos para conectar no Supabase depois ---
  const handleGoogleLogin = () => {};
  const handleGoogleSignup = () => {};

  const handleEmailLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleEmailSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-canvas px-6 py-16">
      {/* grid de fundo sutil, mesmo padrão da Hero da landing */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid-fade bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="overflow-hidden">
          <CardHeader className="items-center pt-8 text-center">
            <CardTitle className="text-2xl">
              {tab === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
            </CardTitle>
            <CardDescription>
              {tab === "login"
                ? "Entre para continuar sua jornada de aprendizado."
                : "Leva menos de um minuto para começar."}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            {/* Segmented control: Entrar / Cadastrar */}
            <div className="relative mb-7 grid grid-cols-2 rounded-full bg-navy-50 p-1">
              {(["login", "signup"] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={cn(
                    "relative z-10 rounded-full py-2 text-sm font-semibold transition-colors duration-200",
                    tab === t ? "text-white" : "text-navy-500 hover:text-navy-900"
                  )}
                >
                  {tab === t && (
                    <motion.span
                      layoutId="auth-tab-indicator"
                      className="absolute inset-0 -z-10 rounded-full bg-navy-900"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {t === "login" ? "Entrar" : "Cadastrar"}
                </button>
              ))}
            </div>

            {tab === "login" ? (
              <div className="space-y-5">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={handleGoogleLogin}
                >
                  <GoogleIcon />
                  Continuar com o Google
                </Button>

                <Divider label="ou entre com seu email" />

                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                      <Input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        placeholder="voce@email.com"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password" className="mb-1.5">
                        Senha
                      </Label>
                      <a
                        href="#"
                        className="mb-1.5 text-xs font-medium text-navy-500 hover:text-navy-900"
                      >
                        Esqueci minha senha
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                      <Input
                        id="login-password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Entrar
                  </Button>
                </form>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Toggle Aluno / Professor */}
                <div>
                  <Label className="mb-2.5">Você quer aprender ou ensinar?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <RoleButton
                      active={role === "aluno"}
                      onClick={() => setRole("aluno")}
                      icon={<BookOpen className="h-4 w-4" />}
                      label="Aluno"
                    />
                    <RoleButton
                      active={role === "professor"}
                      onClick={() => setRole("professor")}
                      icon={<GraduationCap className="h-4 w-4" />}
                      label="Professor"
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={handleGoogleSignup}
                >
                  <GoogleIcon />
                  Cadastrar com o Google
                </Button>

                <Divider label="ou" />

                <form onSubmit={handleEmailSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">Nome completo</Label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                      <Input
                        id="signup-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Seu nome completo"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                      <Input
                        id="signup-email"
                        type="email"
                        autoComplete="email"
                        placeholder="voce@email.com"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-password">Senha</Label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                      <Input
                        id="signup-password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Crie uma senha"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Criar conta
                  </Button>
                </form>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-navy-300">
          Ao continuar, você concorda com nossos{" "}
          <a href="#" className="underline hover:text-navy-500">
            Termos de Uso
          </a>{" "}
          e{" "}
          <a href="#" className="underline hover:text-navy-500">
            Política de Privacidade
          </a>
          .
        </p>
      </motion.div>
    </main>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-navy-900/8" />
      <span className="text-xs text-navy-300">{label}</span>
      <span className="h-px flex-1 bg-navy-900/8" />
    </div>
  );
}

function RoleButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-colors duration-200",
        active
          ? "border-navy-900 bg-navy-900 text-white"
          : "border-navy-900/12 bg-white text-navy-500 hover:border-navy-900/25 hover:text-navy-900"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
