import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "./profile-form";
import LogoutButton from "@/app/sucesso/logout-button";

export default async function PerfilPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName = (user.user_metadata?.full_name as string | undefined) ?? "";
  const role = (user.user_metadata?.role as string | undefined) ?? "aluno";

  return (
    <div className="mx-auto max-w-lg">
      <h2 className="mb-6 text-lg font-bold text-navy-900">Configurações do perfil</h2>
      <div className="rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card">
        <ProfileForm initialName={fullName} email={user.email ?? ""} role={role} />
        <div className="mt-6 border-t border-navy-900/8 pt-6">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
