import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getServerDictionary } from "@/lib/i18n/server";
import PastLessonsList from "./past-lessons-list";

export default async function AulasPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { dict } = getServerDictionary();

  const { data: events } = await supabase
    .from("calendar_events")
    .select("id,title,subtitle,scheduled_at,source,counterparty_user_id")
    .eq("owner_id", user.id)
    .lt("scheduled_at", new Date().toISOString())
    .order("scheduled_at", { ascending: false });

  const name =
    (user.user_metadata?.full_name as string | undefined) ?? user.email?.split("@")[0] ?? "Aluno";

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-lg font-bold text-navy-900 dark:text-white">{dict.lessons.title}</h2>
      <PastLessonsList
        events={events ?? []}
        rateLabel={dict.lessons.rate}
        emptyLabel={dict.lessons.empty}
        raterName={name}
      />
    </div>
  );
}
