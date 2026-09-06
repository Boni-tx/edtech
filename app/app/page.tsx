import { MOCK_PROFESSORS } from "@/lib/mock/professors";
import StarRating from "@/components/app/StarRating";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-navy-900">Professores disponíveis agora</h2>
        <span className="text-sm text-navy-300">{MOCK_PROFESSORS.length} professores</span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_PROFESSORS.map((professor) => (
          <div
            key={professor.id}
            className="group overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-card transition-shadow hover:shadow-card-hover"
          >
            <div className={cn("flex h-32 items-center justify-center bg-gradient-to-br text-3xl font-bold text-white/90", professor.gradient)}>
              {professor.name.charAt(0)}
            </div>
            <div className="flex items-center justify-between gap-2 bg-navy-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-navy-900">{professor.name}</p>
                <p className="text-xs text-navy-500">{professor.subject}</p>
              </div>
              <StarRating rating={professor.rating} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
