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

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Algo deu errado na troca do código — volta pro login com um aviso
  return NextResponse.redirect(`${origin}/login?error=auth_callback`);
}
