"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import RatingPicker from "@/components/app/RatingPicker";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type CalendarEvent = {
  id: string;
  title: string;
  subtitle: string | null;
  scheduled_at: string;
  source: string;
  counterparty_user_id: string | null;
};

export default function PastLessonsList({
  events,
  rateLabel,
  emptyLabel,
  raterName,
}: {
  events: CalendarEvent[];
  rateLabel: string;
  emptyLabel: string;
  raterName: string;
}) {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [openReviewId, setOpenReviewId] = useState<string | null>(null);

  async function submitRating(event: CalendarEvent, rating: number) {
    setRatings((prev) => ({ ...prev, [event.id]: rating }));
    setOpenReviewId(null);
    if (!event.counterparty_user_id) return;

    const supabase = createClient();
    await supabase.from("reviews").insert({
      professor_user_id: event.counterparty_user_id,
      student_name: raterName,
      rating,
    });
  }

  if (events.length === 0) {
    return <p className="text-sm text-navy-500 dark:text-navy-300">{emptyLabel}</p>;
  }

  return (
    <div className="space-y-3">
      {events.map((event) => {
        const date = new Date(event.scheduled_at);
        const myRating = ratings[event.id];
        return (
          <div
            key={event.id}
            className="rounded-2xl border border-navy-900/8 bg-white p-4 shadow-card dark:border-white/10 dark:bg-navy-900"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-navy-900 dark:text-white">{event.title}</p>
                <p className="text-xs text-navy-500 dark:text-navy-300">
                  {event.subtitle ? `${event.subtitle} · ` : ""}
                  {date.toLocaleDateString("pt-BR")}
                </p>
              </div>

              {myRating ? (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < myRating ? "fill-amber-400 text-amber-400" : "text-navy-100 dark:text-white/15"
                      )}
                    />
                  ))}
                </div>
              ) : !event.counterparty_user_id ? null : openReviewId === event.id ? (
                <RatingPicker onSubmit={(rating) => submitRating(event, rating)} />
              ) : (
                <Button variant="outline" size="sm" onClick={() => setOpenReviewId(event.id)}>
                  {rateLabel}
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
