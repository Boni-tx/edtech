import { createBrowserClient } from "@supabase/ssr";

/**
 * Client do Supabase para uso em Client Components (formulários, botões, etc).
 * Lê as credenciais das variáveis de ambiente públicas — precisam estar
 * configuradas tanto localmente (.env.local) quanto na Vercel.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
