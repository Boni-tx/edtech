import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "./profile-form";
import ProfessionalDetailsForm from "./professional-details-form";
import LogoutButton from "@/app/sucesso/logout-button";
import CompleteProfileModal from "@/components/app/CompleteProfileModal";

export default async function PerfilPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const meta = user.user_metadata ?? {};
  const fullName = (meta.full_name as string | undefined) ?? "";
  const role = (meta.role as string | undefined) ?? "aluno";
  const avatarUrl = (meta.avatar_url as string | undefined) ?? null;
  const needsProfessorProfile = role === "professor" && !meta.cpf;

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <CompleteProfileModal show={needsProfessorProfile} />
      <h2 className="text-lg font-bold text-navy-900">Configurações do perfil</h2>

      <div className="rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card">
        <ProfileForm
          userId={user.id}
          initialName={fullName}
          initialAvatarUrl={avatarUrl}
          email={user.email ?? ""}
          role={role}
        />
        <div className="mt-6 border-t border-navy-900/8 pt-6">
          <LogoutButton />
        </div>
      </div>

      {role === "professor" && (
        <ProfessionalDetailsForm
          initial={{
            cpf: (meta.cpf as string | undefined) ?? "",
            cep: (meta.cep as string | undefined) ?? "",
            logradouro: (meta.logradouro as string | undefined) ?? "",
            numero: (meta.numero as string | undefined) ?? "",
            complemento: (meta.complemento as string | undefined) ?? "",
            bairro: (meta.bairro as string | undefined) ?? "",
            cidade: (meta.cidade as string | undefined) ?? "",
            uf: (meta.uf as string | undefined) ?? "",
            telefone: (meta.telefone as string | undefined) ?? "",
          }}
        />
      )}
    </div>
  );
}
