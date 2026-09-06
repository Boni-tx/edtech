import PastLessonsList from "./past-lessons-list";

export default function AulasPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-lg font-bold text-navy-900">Aulas passadas</h2>
      <PastLessonsList />
    </div>
  );
}
