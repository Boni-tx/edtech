"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, GraduationCap, BookOpen, AlertCircle } from "lucide-react";
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
import { createClient } from "@/lib/supabase/client";

type Tab = "login" | "signup";
type Role = "aluno" | "professor";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

type LoginErrors = Partial<Record<"email" | "password", string>>;
type SignupErrors = Partial<
  Record<"name" | "email" | "password" | "confirmPassword", string>
>;

export default function LoginPage() {
  // useSearchParams precisa estar dentro de um Suspense boundary no App Router
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const initialTab: Tab = searchParams.get("tab") === "signup" ? "signup" : "login";
  const initialRole: Role =
    searchParams.get("role") === "professor" ? "professor" : "aluno";

  const [tab, setTab] = useState<Tab>(initialTab);
  const [role, setRole] = useState<Role>(initialRole);

  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});
  const [signupErrors, setSignupErrors] = useState<SignupErrors>({});

  // Erro geral vindo do Supabase (ex: "credenciais inválidas", "email já cadastrado")
  const [authError, setAuthError] = useState<string | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleAuth = async () => {
    setAuthError(null);
    // O toggle Aluno/Professor só existe na aba de cadastro — no login o
    // valor de `role` não representa uma escolha da pessoa, então só
    // mandamos ele adiante (pra gravar no primeiro acesso) quando é cadastro.
    const roleParam = tab === "signup" ? `&role=${role}` : "";
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/sucesso${roleParam}`,
      },
    });
    if (error) setAuthError(traduzErro(error.message));
    // Em caso de sucesso, o navegador é redirecionado pro Google — não tem
    // o que fazer aqui além de deixar o redirect acontecer.
  };

  const handleEmailLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(null);
    setAuthNotice(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const errors: LoginErrors = {};
    if (!EMAIL_REGEX.test(email)) errors.email = "Digite um email válido.";
    if (password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    }
    setLoginErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsSubmitting(false);

    if (error) {
      setAuthError(traduzErro(error.message));
      return;
    }

    router.push("/sucesso");
    router.refresh();
  };

  const handleEmailSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(null);
    setAuthNotice(null);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    const errors: SignupErrors = {};
    if (name.length < 2) errors.name = "Digite seu nome completo.";
    if (!EMAIL_REGEX.test(email)) errors.email = "Digite um email válido.";
    if (password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    }
    if (confirmPassword !== password) errors.confirmPassword = "As senhas não coincidem.";
    setSignupErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, role },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/sucesso`,
      },
    });
    setIsSubmitting(false);

    if (error) {
      setAuthError(traduzErro(error.message));
      return;
    }

    // Se o projeto Supabase exige confirmação de email, `session` vem nulo
    // aqui — a pessoa só entra depois de clicar no link recebido por email.
    if (!data.session) {
      setAuthNotice(
        "Conta criada! Confira seu email para confirmar o cadastro antes de entrar."
      );
      return;
    }

    router.push("/sucesso");
    router.refresh();
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-canvas px-6 py-16">
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
                  onClick={() => {
                    setTab(t);
                    setAuthError(null);
                    setAuthNotice(null);
                  }}
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

            {authError && <AuthMessage tone="error" message={authError} />}
            {authNotice && <AuthMessage tone="notice" message={authNotice} />}

            {tab === "login" ? (
              <div className="space-y-5">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={handleGoogleAuth}
                >
                  <GoogleIcon />
                  Continuar com o Google
                </Button>

                <Divider label="ou entre com seu email" />

                <form onSubmit={handleEmailLogin} noValidate className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="voce@email.com"
                        className={cn(
                          "pl-10",
                          loginErrors.email && "border-red-400 focus-visible:ring-red-200"
                        )}
                      />
                    </div>
                    {loginErrors.email && <FieldError message={loginErrors.email} />}
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
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className={cn(
                          "pl-10",
                          loginErrors.password && "border-red-400 focus-visible:ring-red-200"
                        )}
                      />
                    </div>
                    {loginErrors.password && <FieldError message={loginErrors.password} />}
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Entrando..." : "Entrar"}
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
                  onClick={handleGoogleAuth}
                >
                  <GoogleIcon />
                  Cadastrar com o Google
                </Button>

                <Divider label="ou" />

                <form onSubmit={handleEmailSignup} noValidate className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">Nome completo</Label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                      <Input
                        id="signup-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Seu nome completo"
                        className={cn(
                          "pl-10",
                          signupErrors.name && "border-red-400 focus-visible:ring-red-200"
                        )}
                      />
                    </div>
                    {signupErrors.name && <FieldError message={signupErrors.name} />}
                  </div>

                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="voce@email.com"
                        className={cn(
                          "pl-10",
                          signupErrors.email && "border-red-400 focus-visible:ring-red-200"
                        )}
                      />
                    </div>
                    {signupErrors.email && <FieldError message={signupErrors.email} />}
                  </div>

                  <div>
                    <Label htmlFor="signup-password">Senha</Label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Mínimo de 6 caracteres"
                        className={cn(
                          "pl-10",
                          signupErrors.password && "border-red-400 focus-visible:ring-red-200"
                        )}
                      />
                    </div>
                    {signupErrors.password && <FieldError message={signupErrors.password} />}
                  </div>

                  <div>
                    <Label htmlFor="signup-confirm-password">Confirmar senha</Label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                      <Input
                        id="signup-confirm-password"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Repita a senha"
                        className={cn(
                          "pl-10",
                          signupErrors.confirmPassword &&
                            "border-red-400 focus-visible:ring-red-200"
                        )}
                      />
                    </div>
                    {signupErrors.confirmPassword && (
                      <FieldError message={signupErrors.confirmPassword} />
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Criando conta..." : "Criar conta"}
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

/** Traduz as mensagens de erro mais comuns do Supabase para português */
function traduzErro(message: string): string {
  const map: Record<string, string> = {
    "Invalid login credentials": "Email ou senha incorretos.",
    "User already registered": "Já existe uma conta com esse email.",
    "Email not confirmed": "Confirme seu email antes de entrar.",
    "Password should be at least 6 characters":
      "A senha precisa ter pelo menos 6 caracteres.",
    "Email address is invalid": "Digite um email válido.",
    "email rate limit exceeded":
      "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.",
    "over_email_send_rate_limit":
      "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.",
  };
  if (map[message]) return map[message];
  if (/invalid/i.test(message)) return "Digite um email válido.";
  if (/rate limit/i.test(message)) {
    return "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.";
  }
  return "Não foi possível concluir. Tente novamente em instantes.";
}

function AuthMessage({ tone, message }: { tone: "error" | "notice"; message: string }) {
  return (
    <div
      className={cn(
        "mb-5 flex items-start gap-2 rounded-lg border px-3.5 py-3 text-sm",
        tone === "error"
          ? "border-red-200 bg-red-50 text-red-600"
          : "border-confirm-500/20 bg-confirm-500/5 text-confirm-600"
      )}
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
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

function FieldError({ message }: { message: string }) {
  return <p className="mt-1.5 text-xs font-medium text-red-500">{message}</p>;
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
