import { CalendarDays, Clock } from "lucide-react";
import { MOCK_UPCOMING_LESSONS } from "@/lib/mock/lessons";
import { MOCK_PROFESSORS } from "@/lib/mock/professors";

function formatDate(iso: string) {
  const date = new Date(iso);
  return {
    day: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
    time: date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function CalendarioPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-lg font-bold text-navy-900">Aulas agendadas</h2>

      {MOCK_UPCOMING_LESSONS.length === 0 ? (
        <p className="text-sm text-navy-500">Você ainda não tem aulas agendadas.</p>
      ) : (
        <div className="space-y-3">
          {MOCK_UPCOMING_LESSONS.map((lesson) => {
            const professor = MOCK_PROFESSORS.find((p) => p.id === lesson.professorId);
            const { day, time } = formatDate(lesson.date);
            return (
              <div
                key={lesson.id}
                className="flex items-center gap-4 rounded-2xl border border-navy-900/8 bg-white p-4 shadow-card"
              >
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-50 text-navy-900">
                  <CalendarDays className="h-4 w-4" />
                  <span className="mt-0.5 text-[11px] font-semibold uppercase">{day}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy-900">{professor?.name}</p>
                  <p className="text-xs text-navy-500">{professor?.subject}</p>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-navy-700">
                  <Clock className="h-4 w-4 text-navy-300" />
                  {time}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
