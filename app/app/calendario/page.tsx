import MonthCalendar from "@/components/app/MonthCalendar";

export default function CalendarioPage() {
  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-lg font-bold text-navy-900">Aulas agendadas</h2>
      <MonthCalendar />
    </div>
  );
}
