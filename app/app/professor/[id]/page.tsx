import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProfessorById } from "@/lib/professors";
import { getServerDictionary } from "@/lib/i18n/server";
import StarRating from "@/components/app/StarRating";
import BookingFlow from "@/components/app/BookingFlow";
import { cn } from "@/lib/utils";

export default async function ProfessorPage({ params }: { params: { id: string } }) {
  const { dict } = getServerDictionary();
  const professor = await getProfessorById(params.id);
  if (!professor) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/app"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-900 dark:text-navy-300 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        {dict.professor.back}
      </Link>

      <div className="overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-card dark:border-white/10 dark:bg-navy-900">
        {professor.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={professor.photoUrl} alt={professor.name} className="h-40 w-full object-cover" />
        ) : (
          <div
            className={cn(
              "flex h-40 items-center justify-center bg-gradient-to-br text-5xl font-bold text-white/90",
              professor.gradient
            )}
          >
            {professor.name.charAt(0)}
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-navy-900 dark:text-white">{professor.name}</h1>
              <p className="text-sm text-navy-500 dark:text-navy-300">{professor.subject}</p>
            </div>
            <div className="text-right">
              <StarRating rating={professor.rating} />
              <p className="mt-1 text-xs text-navy-300 dark:text-navy-500">
                {professor.reviewsCount} {dict.professor.reviews}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-navy-500 dark:text-navy-300">{professor.bio}</p>
        </div>
      </div>

      <BookingFlow professor={professor} dict={dict.booking} />
    </div>
  );
}
