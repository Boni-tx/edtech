"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Star, ShieldCheck } from "lucide-react";
import MagneticButton from "./MagneticButton";
import TiltCard from "./TiltCard";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// MOCK — substituir por fetch do Supabase depois
const mockSession = {
  subject: "Química Orgânica",
  tutor: "Tiago M.",
  rating: 4.9,
  time: "Hoje, 15h00",
};

export default function Hero({ dict }: { dict: Dictionary["landing"] }) {
  const router = useRouter();

  return (
    <section className="relative px-6 pt-28 pb-24 sm:pt-36 sm:pb-32 lg:px-8">
      {/* grid de fundo sutil */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid-fade bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Coluna de texto */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white px-4 py-1.5 text-xs font-medium text-navy-500"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-confirm-500" />
            {dict.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl"
          >
            {dict.headline1}
            <br />
            <span className="text-navy-500">{dict.headline2}</span>
            <br />
            {dict.headline3}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-navy-500"
          >
            {dict.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <MagneticButton
              variant="primary"
              onClick={() => router.push("/login?tab=signup&role=aluno")}
            >
              {dict.ctaFindTutor}
            </MagneticButton>
            <MagneticButton
              variant="secondary"
              onClick={() => router.push("/login?tab=signup&role=professor")}
            >
              {dict.ctaTeach}
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex items-center gap-2 text-sm text-navy-500"
          >
            <ShieldCheck className="h-4 w-4 text-confirm-600" />
            {dict.paymentProtected}
          </motion.div>
        </div>

        {/* Coluna visual — card flutuante com tilt */}
        <div className="relative flex justify-center lg:justify-end">
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-sm"
          >
            <TiltCard className="p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-confirm-500/10 px-3 py-1 text-xs font-semibold text-confirm-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-confirm-500" />
                  {dict.mockConfirmed}
                </span>
                <BookOpen className="h-5 w-5 text-navy-300" />
              </div>

              <p className="mt-5 text-xl font-semibold text-navy-900">
                {mockSession.subject}
              </p>
              <p className="mt-1 text-sm text-navy-500">{mockSession.time}</p>

              <div className="mt-6 flex items-center justify-between border-t border-navy-900/8 pt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-white">
                    {mockSession.tutor.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-900">
                      {mockSession.tutor}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-navy-500">
                      <Star className="h-3 w-3 fill-confirm-500 text-confirm-500" />
                      {mockSession.rating}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium text-navy-500">
                  {dict.mockRoomReady}
                </span>
              </div>
            </TiltCard>
          </motion.div>

          {/* elemento flutuante secundário, decorativo */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute -left-6 -bottom-6 hidden rounded-xl border border-navy-900/8 bg-white px-4 py-3 shadow-card sm:block"
          >
            <p className="text-xs text-navy-500">{dict.mockHeldPayment}</p>
            <p className="text-sm font-semibold text-navy-900">R$ 50,00</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
