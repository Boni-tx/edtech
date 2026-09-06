"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function AddCalendarEventForm({
  addLabel,
  titleLabel,
  dateLabel,
  timeLabel,
  saveLabel,
  cancelLabel,
}: {
  addLabel: string;
  titleLabel: string;
  dateLabel: string;
  timeLabel: string;
  saveLabel: string;
  cancelLabel: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !date) return;

    setSaving(true);
    setError(null);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      return;
    }

    const scheduledAt = new Date(`${date}T${time}:00`).toISOString();
    const { error: insertError } = await supabase.from("calendar_events").insert({
      owner_id: user.id,
      title: title.trim(),
      scheduled_at: scheduledAt,
      source: "manual",
    });

    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }

    setTitle("");
    setDate("");
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        {addLabel}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/40 px-6 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-card-hover dark:bg-navy-900"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-navy-300 hover:text-navy-900 dark:text-navy-500 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-sm font-bold text-navy-900 dark:text-white">{addLabel}</h3>

            <div>
              <Label htmlFor="event-title">{titleLabel}</Label>
              <Input id="event-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="event-date">{dateLabel}</Label>
                <Input id="event-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="event-time">{timeLabel}</Label>
                <Input id="event-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
            </div>
            {error && <p className="text-xs font-medium text-red-500">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit" size="sm" className="flex-1" disabled={saving}>
                {saveLabel}
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
                {cancelLabel}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
