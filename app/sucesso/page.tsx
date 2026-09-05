import { redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./logout-button";

export default async function SucessoPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Sem sessão válida = sem acesso a essa página. Isso roda no servidor,
  // então não dá pra burlar só editando o front.
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-canvas px-6 py-16">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid-fade bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />

      <div className="w-full max-w-md rounded-2xl border border-navy-900/8 bg-white p-10 text-center shadow-card">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-confirm-500/10">
          <CheckCircle2 className="h-7 w-7 text-confirm-600" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-navy-900">
          Êxito na autenticação
        </h1>
        <p className="mt-2 text-sm text-navy-500">
          Você está logado como{" "}
          <span className="font-medium text-navy-900">{user.email}</span>.
        </p>

        <LogoutButton />
      </div>
    </main>
  );
}
