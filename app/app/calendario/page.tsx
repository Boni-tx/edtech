import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getServerDictionary } from "@/lib/i18n/server";
import MonthCalendar from "@/components/app/MonthCalendar";
import AddCalendarEventForm from "@/components/app/AddCalendarEventForm";

export default async function CalendarioPage() {
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
    .select("id,title,subtitle,scheduled_at")
    .eq("owner_id", user.id)
    .order("scheduled_at", { ascending: true });

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-navy-900 dark:text-white">{dict.calendar.title}</h2>
        <AddCalendarEventForm
          addLabel={dict.calendar.add}
          titleLabel={dict.calendar.eventTitle}
          dateLabel={dict.calendar.eventDate}
          timeLabel={dict.calendar.eventTime}
          saveLabel={dict.perfil.save}
          cancelLabel={dict.calendar.cancel}
        />
      </div>
      <MonthCalendar events={events ?? []} />
    </div>
  );
}
