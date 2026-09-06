import Link from "next/link";
import { getAllProfessors } from "@/lib/professors";
import { getServerDictionary } from "@/lib/i18n/server";
import StarRating from "@/components/app/StarRating";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  const { dict } = getServerDictionary();
  const professors = await getAllProfessors();
  const sorted = [...professors].sort((a, b) => b.rating - a.rating);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-navy-900 dark:text-white">{dict.dashboard.title}</h2>
        <span className="text-sm text-navy-300 dark:text-navy-500">
          {sorted.length} {dict.dashboard.count}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sorted.map((professor) => (
          <Link
            key={professor.id}
            href={`/app/professor/${professor.id}`}
            className="group overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-card transition-shadow hover:shadow-card-hover dark:border-white/10 dark:bg-navy-900"
          >
            {professor.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={professor.photoUrl} alt={professor.name} className="h-32 w-full object-cover" />
            ) : (
              <div
                className={cn(
                  "flex h-32 items-center justify-center bg-gradient-to-br text-3xl font-bold text-white/90",
                  professor.gradient
                )}
              >
                {professor.name.charAt(0)}
              </div>
            )}
            <div
              className={cn(
                "flex items-center justify-between gap-2 px-4 py-3",
                professor.rating === 5 ? "bg-navy-900 dark:bg-white/10" : "bg-navy-50 dark:bg-white/5"
              )}
            >
              <div>
                <p
                  className={cn(
                    "text-sm font-semibold",
                    professor.rating === 5 ? "text-white" : "text-navy-900 dark:text-white"
                  )}
                >
                  {professor.name}
                </p>
                <p
                  className={cn(
                    "text-xs",
                    professor.rating === 5 ? "text-navy-100" : "text-navy-500 dark:text-navy-300"
                  )}
                >
                  {professor.subject}
                </p>
              </div>
              <StarRating rating={professor.rating} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
