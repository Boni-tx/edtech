import { redirect } from "next/navigation";
import { Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getServerDictionary } from "@/lib/i18n/server";
import EarningsChart from "@/components/app/EarningsChart";
import { cn } from "@/lib/utils";

export default async function GanhosPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const role = (user.user_metadata?.role as string | undefined) ?? "aluno";
  if (role !== "professor") {
    redirect("/app");
  }

  const { dict } = getServerDictionary();

  const [{ data: payments }, { data: reviews }] = await Promise.all([
    supabase
      .from("payments")
      .select("amount_sol,student_name,tx_signature,created_at")
      .eq("professor_user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("reviews")
      .select("rating,student_name,comment,created_at")
      .eq("professor_user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  const total = (payments ?? []).reduce((sum, p) => sum + Number(p.amount_sol), 0);

  const totalsByDay = new Map<string, number>();
  for (const p of payments ?? []) {
    const day = new Date(p.created_at).toISOString().slice(0, 10);
    totalsByDay.set(day, (totalsByDay.get(day) ?? 0) + Number(p.amount_sol));
  }
  const chartData = Array.from(totalsByDay.entries())
    .map(([date, totalAmount]) => ({ date, total: totalAmount }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h2 className="text-lg font-bold text-navy-900 dark:text-white">{dict.earnings.title}</h2>

      <div className="rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card dark:border-white/10 dark:bg-navy-900">
        <p className="text-xs text-navy-500 dark:text-navy-300">{dict.earnings.totalEarned}</p>
        <p className="mt-1 text-3xl font-bold text-navy-900 dark:text-white">{total.toFixed(3)} SOL</p>

        <div className="mt-6">
          {chartData.length > 0 ? (
            <EarningsChart data={chartData} />
          ) : (
            <p className="text-sm text-navy-300 dark:text-navy-500">{dict.earnings.noPayments}</p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card dark:border-white/10 dark:bg-navy-900">
        <h3 className="mb-4 text-sm font-bold text-navy-900 dark:text-white">
          {dict.earnings.recentPayments}
        </h3>
        {(payments ?? []).length === 0 ? (
          <p className="text-sm text-navy-300 dark:text-navy-500">{dict.earnings.noPayments}</p>
        ) : (
          <div className="space-y-2">
            {(payments ?? []).map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-navy-900/8 px-3.5 py-2.5 text-sm dark:border-white/10"
              >
                <div>
                  <p className="font-medium text-navy-900 dark:text-white">{p.amount_sol} SOL</p>
                  {p.student_name && (
                    <p className="text-xs text-navy-500 dark:text-navy-300">
                      {dict.earnings.from} {p.student_name}
                    </p>
                  )}
                </div>
                <span className="text-xs text-navy-300 dark:text-navy-500">
                  {new Date(p.created_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-navy-900/8 bg-white p-6 shadow-card dark:border-white/10 dark:bg-navy-900">
        <h3 className="mb-4 text-sm font-bold text-navy-900 dark:text-white">{dict.earnings.reviewsTitle}</h3>
        {(reviews ?? []).length === 0 ? (
          <p className="text-sm text-navy-300 dark:text-navy-500">{dict.earnings.noReviews}</p>
        ) : (
          <div className="space-y-3">
            {(reviews ?? []).map((r, i) => (
              <div key={i} className="rounded-lg border border-navy-900/8 p-3.5 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-navy-900 dark:text-white">
                    {r.student_name ?? "Aluno"}
                  </p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={cn(
                          "h-3.5 w-3.5",
                          j < r.rating ? "fill-amber-400 text-amber-400" : "text-navy-100 dark:text-white/15"
                        )}
                      />
                    ))}
                  </div>
                </div>
                {r.comment && (
                  <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">{r.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
