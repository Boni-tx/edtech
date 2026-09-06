"use client";

import { useMemo, useState } from "react";
import { MOCK_UPCOMING_LESSONS, type Lesson } from "@/lib/mock/lessons";
import { MOCK_PROFESSORS } from "@/lib/mock/professors";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function MonthCalendar() {
  const today = useMemo(() => new Date(), []);
  const [viewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const lessonsByDay = useMemo(() => {
    const map = new Map<number, Lesson[]>();
    for (const lesson of MOCK_UPCOMING_LESSONS) {
      const d = new Date(lesson.date);
      if (d.getFullYear() === viewDate.getFullYear() && d.getMonth() === viewDate.getMonth()) {
        const day = d.getDate();
        map.set(day, [...(map.get(day) ?? []), lesson]);
      }
    }
    return map;
  }, [viewDate]);

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const startWeekday = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  const cells: (number | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthLabel = viewDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const selectedLessons = selectedDay ? lessonsByDay.get(selectedDay) : undefined;

  return (
    <div>
      <div className="rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card dark:border-white/10 dark:bg-navy-900">
        <p className="mb-4 text-center text-sm font-semibold capitalize text-navy-900 dark:text-white">
          {monthLabel}
        </p>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-navy-300 dark:text-navy-500">
          {WEEKDAYS.map((w, i) => (
            <div key={i} className="py-2">
              {w}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) return <div key={i} />;
            const lessons = lessonsByDay.get(day);
            const isToday =
              day === today.getDate() &&
              viewDate.getMonth() === today.getMonth() &&
              viewDate.getFullYear() === today.getFullYear();

            return (
              <button
                key={i}
                type="button"
                onClick={() => lessons && setSelectedDay(day)}
                className={cn(
                  "flex aspect-square flex-col items-center justify-center gap-0.5 rounded-lg text-sm transition-colors",
                  lessons
                    ? "cursor-pointer bg-navy-900 font-semibold text-white hover:bg-navy-700 dark:bg-white dark:text-navy-900 dark:hover:bg-navy-100"
                    : "text-navy-700 hover:bg-navy-50 dark:text-navy-300 dark:hover:bg-white/5",
                  isToday && !lessons && "ring-2 ring-navy-900/30",
                  selectedDay === day && lessons && "ring-2 ring-confirm-400"
                )}
              >
                {day}
                {lessons && <span className="h-1 w-1 rounded-full bg-confirm-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {selectedLessons && (
        <div className="mt-4 space-y-2">
          {selectedLessons.map((lesson) => {
            const professor = MOCK_PROFESSORS.find((p) => p.id === lesson.professorId);
            const time = new Date(lesson.date).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div
                key={lesson.id}
                className="flex items-center justify-between rounded-xl border border-navy-900/8 bg-white p-4 shadow-card dark:border-white/10 dark:bg-navy-900"
              >
                <div>
                  <p className="text-sm font-semibold text-navy-900 dark:text-white">{professor?.name}</p>
                  <p className="text-xs text-navy-500 dark:text-navy-300">{professor?.subject}</p>
                </div>
                <span className="text-sm font-medium text-navy-700 dark:text-navy-100">{time}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
