"use client";

import { motion } from "framer-motion";
import { Frown, Sparkles } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
};

export default function ProblemSolution() {
  return (
    <section className="px-6 py-24 lg:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2"
      >
        <motion.div
          variants={item}
          className="rounded-2xl border border-navy-900/8 bg-white p-8 sm:p-10"
        >
          <Frown className="h-7 w-7 text-navy-300" />
          <h3 className="mt-5 text-xl font-semibold text-navy-900">
            A prova é sexta e você ainda não entendeu a matéria
          </h3>
          <p className="mt-3 leading-relaxed text-navy-500">
            Grupos de Facebook, professor particular que não responde,
            cursinho caro e com pacote mensal que você não precisa. Ajuda
            pontual virou um problema em si.
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="rounded-2xl border border-navy-900/8 bg-navy-900 p-8 text-white sm:p-10"
        >
          <Sparkles className="h-7 w-7 text-confirm-400" />
          <h3 className="mt-5 text-xl font-semibold">
            Aula avulsa, sob demanda, na matéria certa
          </h3>
          <p className="mt-3 leading-relaxed text-navy-100/80">
            Busque a disciplina, escolha um professor avaliado pela
            comunidade e agende uma aula só — sem assinatura, sem
            fidelidade.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
