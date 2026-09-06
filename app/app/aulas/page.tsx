import PastLessonsList from "./past-lessons-list";
import { getServerDictionary } from "@/lib/i18n/server";

export default function AulasPage() {
  const { dict } = getServerDictionary();
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-lg font-bold text-navy-900 dark:text-white">{dict.lessons.title}</h2>
      <PastLessonsList rateLabel={dict.lessons.rate} />
    </div>
  );
}
