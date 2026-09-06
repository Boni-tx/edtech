"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RatingPicker({ onSubmit }: { onSubmit: (rating: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const value = i + 1;
        return (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onSubmit(value)}
          >
            <Star
              className={cn(
                "h-5 w-5 transition-colors",
                value <= hovered ? "fill-amber-400 text-amber-400" : "text-navy-100 dark:text-white/15"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
