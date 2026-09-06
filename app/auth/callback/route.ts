import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * O Supabase (e o Google, no fluxo OAuth) redireciona pra cá depois
 * que a pessoa autoriza o login. Trocamos o "code" por uma sessão real
 * e mandamos ela pra rota de sucesso.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/sucesso";
  const role = searchParams.get("role");

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Só grava o papel (aluno/professor) se a pessoa acabou de se cadastrar
      // (veio da aba de cadastro) e ainda não tem um definido — evita
      // sobrescrever a escolha original em logins futuros pelo Google.
      if (role === "aluno" || role === "professor") {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user && !user.user_metadata?.role) {
          await supabase.auth.updateUser({ data: { role } });
        }
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Algo deu errado na troca do código — volta pro login com um aviso
  return NextResponse.redirect(`${origin}/login?error=auth_callback`);
}
