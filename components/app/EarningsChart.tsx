"use client";

import { useState } from "react";

type DayTotal = { date: string; total: number };

export default function EarningsChart({ data }: { data: DayTotal[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (data.length === 0) return null;

  const max = Math.max(...data.map((d) => d.total));
  const barWidth = 28;
  const gap = 12;
  const chartHeight = 140;
  const width = data.length * (barWidth + gap) - gap;

  return (
    <div className="overflow-x-auto">
      <svg
        width={Math.max(width, 200)}
        height={chartHeight + 28}
        role="img"
        aria-label="Ganhos por dia"
      >
        {data.map((d, i) => {
          const barHeight = max > 0 ? Math.max((d.total / max) * chartHeight, 4) : 4;
          const x = i * (barWidth + gap);
          const y = chartHeight - barHeight;
          const isHovered = hovered === i;
          const label = new Date(d.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

          return (
            <g key={d.date}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={4}
                className={isHovered ? "fill-confirm-600 dark:fill-confirm-400" : "fill-confirm-500 dark:fill-confirm-500"}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <title>
                  {label}: {d.total.toFixed(3)} SOL
                </title>
              </rect>
              {isHovered && (
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  textAnchor="middle"
                  className="fill-navy-900 text-[11px] font-semibold dark:fill-white"
                >
                  {d.total.toFixed(3)}
                </text>
              )}
              <text
                x={x + barWidth / 2}
                y={chartHeight + 18}
                textAnchor="middle"
                className="fill-navy-300 text-[10px] dark:fill-navy-500"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
