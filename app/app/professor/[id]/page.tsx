import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MOCK_PROFESSORS } from "@/lib/mock/professors";
import StarRating from "@/components/app/StarRating";
import BookingFlow from "@/components/app/BookingFlow";
import { cn } from "@/lib/utils";

export default function ProfessorPage({ params }: { params: { id: string } }) {
  const professor = MOCK_PROFESSORS.find((p) => p.id === params.id);
  if (!professor) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/app"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>

      <div className="overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-card">
        <div
          className={cn(
            "flex h-40 items-center justify-center bg-gradient-to-br text-5xl font-bold text-white/90",
            professor.gradient
          )}
        >
          {professor.name.charAt(0)}
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-navy-900">{professor.name}</h1>
              <p className="text-sm text-navy-500">{professor.subject}</p>
            </div>
            <div className="text-right">
              <StarRating rating={professor.rating} />
              <p className="mt-1 text-xs text-navy-300">{professor.reviewsCount} avaliações</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-navy-500">{professor.bio}</p>
        </div>
      </div>

      <BookingFlow professor={professor} />
    </div>
  );
}
