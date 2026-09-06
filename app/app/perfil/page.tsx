import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getServerDictionary } from "@/lib/i18n/server";
import ProfileForm from "./profile-form";
import ProfessionalDetailsForm from "./professional-details-form";
import LogoutButton from "@/app/sucesso/logout-button";
import CompleteProfileModal from "@/components/app/CompleteProfileModal";
import ThemeToggle from "@/components/app/ThemeToggle";
import LanguageToggle from "@/components/app/LanguageToggle";

export default async function PerfilPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { locale, dict } = getServerDictionary();
  const meta = user.user_metadata ?? {};
  const fullName = (meta.full_name as string | undefined) ?? "";
  const role = (meta.role as string | undefined) ?? "aluno";
  const avatarUrl = (meta.avatar_url as string | undefined) ?? null;
  const needsProfessorProfile = role === "professor" && !meta.cpf;

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <CompleteProfileModal show={needsProfessorProfile} dict={dict.professional} />
      <h2 className="text-lg font-bold text-navy-900 dark:text-white">{dict.perfil.title}</h2>

      <div className="rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card dark:border-white/10 dark:bg-navy-900">
        <ProfileForm
          userId={user.id}
          initialName={fullName}
          initialAvatarUrl={avatarUrl}
          email={user.email ?? ""}
          role={role}
          dict={dict.perfil}
        />
        <div className="mt-6 border-t border-navy-900/8 pt-6 dark:border-white/10">
          <LogoutButton label={dict.perfil.logout} />
        </div>
      </div>

      <div className="rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card dark:border-white/10 dark:bg-navy-900">
        <h3 className="mb-4 text-sm font-bold text-navy-900 dark:text-white">{dict.perfil.preferences}</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-navy-500 dark:text-navy-300">{dict.perfil.theme}</span>
            <ThemeToggle labelLight={dict.perfil.themeLight} labelDark={dict.perfil.themeDark} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-navy-500 dark:text-navy-300">{dict.perfil.language}</span>
            <LanguageToggle locale={locale} />
          </div>
        </div>
      </div>

      {role === "professor" && (
        <ProfessionalDetailsForm
          dict={dict.professional}
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
