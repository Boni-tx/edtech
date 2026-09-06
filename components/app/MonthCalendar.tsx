"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type CalendarEvent = {
  id: string;
  title: string;
  subtitle: string | null;
  scheduled_at: string;
};

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function MonthCalendar({ events }: { events: CalendarEvent[] }) {
  const today = useMemo(() => new Date(), []);
  const [viewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const eventsByDay = useMemo(() => {
    const map = new Map<number, CalendarEvent[]>();
    for (const event of events) {
      const d = new Date(event.scheduled_at);
      if (d.getFullYear() === viewDate.getFullYear() && d.getMonth() === viewDate.getMonth()) {
        const day = d.getDate();
        map.set(day, [...(map.get(day) ?? []), event]);
      }
    }
    return map;
  }, [events, viewDate]);

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const startWeekday = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  const cells: (number | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthLabel = viewDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const selectedEvents = selectedDay ? eventsByDay.get(selectedDay) : undefined;

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
            const dayEvents = eventsByDay.get(day);
            const isToday =
              day === today.getDate() &&
              viewDate.getMonth() === today.getMonth() &&
              viewDate.getFullYear() === today.getFullYear();

            return (
              <button
                key={i}
                type="button"
                onClick={() => dayEvents && setSelectedDay(day)}
                className={cn(
                  "flex aspect-square flex-col items-center justify-center gap-0.5 rounded-lg text-sm transition-colors",
                  dayEvents
                    ? "cursor-pointer bg-navy-900 font-semibold text-white hover:bg-navy-700 dark:bg-white dark:text-navy-900 dark:hover:bg-navy-100"
                    : "text-navy-700 hover:bg-navy-50 dark:text-navy-300 dark:hover:bg-white/5",
                  isToday && !dayEvents && "ring-2 ring-navy-900/30",
                  selectedDay === day && dayEvents && "ring-2 ring-confirm-400"
                )}
              >
                {day}
                {dayEvents && <span className="h-1 w-1 rounded-full bg-confirm-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {selectedEvents && (
        <div className="mt-4 space-y-2">
          {selectedEvents.map((event) => {
            const time = new Date(event.scheduled_at).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-xl border border-navy-900/8 bg-white p-4 shadow-card dark:border-white/10 dark:bg-navy-900"
              >
                <div>
                  <p className="text-sm font-semibold text-navy-900 dark:text-white">{event.title}</p>
                  {event.subtitle && (
                    <p className="text-xs text-navy-500 dark:text-navy-300">{event.subtitle}</p>
                  )}
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
