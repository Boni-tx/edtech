import MonthCalendar from "@/components/app/MonthCalendar";
import { getServerDictionary } from "@/lib/i18n/server";

export default function CalendarioPage() {
  const { dict } = getServerDictionary();
  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-lg font-bold text-navy-900 dark:text-white">{dict.calendar.title}</h2>
      <MonthCalendar />
    </div>
  );
}
