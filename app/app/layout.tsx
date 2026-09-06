import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getServerDictionary } from "@/lib/i18n/server";
import Sidebar from "@/components/app/Sidebar";
import Topbar from "@/components/app/Topbar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const name =
    (user.user_metadata?.full_name as string | undefined)?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    "";
  const avatarUrl = (user.user_metadata?.avatar_url as string | undefined) ?? null;
  const role = (user.user_metadata?.role as string | undefined) ?? "aluno";
  const { dict } = getServerDictionary();

  return (
    <div className="flex h-screen overflow-hidden bg-canvas dark:bg-navy-950">
      <Sidebar isProfessor={role === "professor"} dict={dict.sidebar} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar name={name} avatarUrl={avatarUrl} hello={dict.topbar.hello} />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
