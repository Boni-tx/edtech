"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { MOCK_PAST_LESSONS, type Lesson } from "@/lib/mock/lessons";
import { MOCK_PROFESSORS } from "@/lib/mock/professors";
import { Button } from "@/components/ui/button";
import RatingPicker from "@/components/app/RatingPicker";
import { cn } from "@/lib/utils";

export default function PastLessonsList() {
  const [lessons, setLessons] = useState<Lesson[]>(MOCK_PAST_LESSONS);
  const [openReviewId, setOpenReviewId] = useState<string | null>(null);

  function submitRating(lessonId: string, rating: number) {
    setLessons((prev) =>
      prev.map((l) => (l.id === lessonId ? { ...l, myRating: rating } : l))
    );
    setOpenReviewId(null);
  }

  return (
    <div className="space-y-3">
      {lessons.map((lesson) => {
        const professor = MOCK_PROFESSORS.find((p) => p.id === lesson.professorId);
        const date = new Date(lesson.date);
        return (
          <div key={lesson.id} className="rounded-2xl border border-navy-900/8 bg-white p-4 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-navy-900">{professor?.name}</p>
                <p className="text-xs text-navy-500">
                  {professor?.subject} · {date.toLocaleDateString("pt-BR")}
                </p>
              </div>

              {lesson.myRating ? (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < lesson.myRating! ? "fill-amber-400 text-amber-400" : "text-navy-100"
                      )}
                    />
                  ))}
                </div>
              ) : openReviewId === lesson.id ? (
                <RatingPicker onSubmit={(rating) => submitRating(lesson.id, rating)} />
              ) : (
                <Button variant="outline" size="sm" onClick={() => setOpenReviewId(lesson.id)}>
                  Avaliar
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
