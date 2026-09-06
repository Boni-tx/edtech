import Hero from "@/components/landing/Hero";
import ProblemSolution from "@/components/landing/ProblemSolution";
import HowItWorks from "@/components/landing/HowItWorks";
import TrustSection from "@/components/landing/TrustSection";
import Footer from "@/components/landing/Footer";
import LanguageToggle from "@/components/app/LanguageToggle";
import { getServerDictionary } from "@/lib/i18n/server";

export default function Home() {
  const { locale, dict } = getServerDictionary();

  return (
    <main className="overflow-x-hidden">
      <div className="fixed right-4 top-4 z-40 sm:right-6 sm:top-6">
        <LanguageToggle locale={locale} />
      </div>
      <Hero dict={dict.landing} />
      <ProblemSolution dict={dict.landing} />
      <HowItWorks dict={dict.landing} />
      <TrustSection dict={dict.landing} />
      <Footer dict={dict.landing} />
    </main>
  );
}
