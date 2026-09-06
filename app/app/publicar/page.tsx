import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PublishProfileForm from "./publish-profile-form";

export default async function PublicarPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const role = (user.user_metadata?.role as string | undefined) ?? "aluno";
  if (role !== "professor") {
    redirect("/app");
  }

  const { data: existing } = await supabase
    .from("professor_profiles")
    .select("name,subject,bio,photo_url,wallet_address,cep,telefone,diploma_url")
    .eq("user_id", user.id)
    .maybeSingle();

  const meta = user.user_metadata ?? {};

  return (
    <div className="mx-auto max-w-lg">
      <h2 className="mb-1 text-lg font-bold text-navy-900 dark:text-white">
        Publicar perfil de professor
      </h2>
      <p className="mb-6 text-sm text-navy-500 dark:text-navy-300">
        Preencha os dados abaixo pra aparecer na aba de Aulas pros alunos. Já preenchemos o que já
        sabemos sobre você.
      </p>

      <PublishProfileForm
        userId={user.id}
        initial={{
          name: existing?.name ?? (meta.full_name as string | undefined) ?? "",
          subject: existing?.subject ?? "",
          bio: existing?.bio ?? "",
          photoUrl: existing?.photo_url ?? (meta.avatar_url as string | undefined) ?? "",
          walletAddress: existing?.wallet_address ?? "",
          cep: existing?.cep ?? (meta.cep as string | undefined) ?? "",
          telefone: existing?.telefone ?? (meta.telefone as string | undefined) ?? "",
          diplomaUrl: existing?.diploma_url ?? "",
        }}
      />
    </div>
  );
}
