"use client";

import { motion } from "framer-motion";
import { Lock, Users, Flag } from "lucide-react";

// MOCK — substituir por números reais vindos do Supabase quando disponíveis
const mockStats = [
  {
    icon: Lock,
    title: "Pagamento protegido",
    description:
      "O valor da aula fica retido na plataforma e só é repassado ao professor após a conclusão.",
  },
  {
    icon: Users,
    title: "Avaliado pela comunidade",
    description:
      "Professores são avaliados por estrelas a cada aula — sem exigência prévia de diploma.",
  },
  {
    icon: Flag,
    title: "Garantia de estorno",
    description:
      "Problema com a aula? Você tem 24h para denunciar e receber 100% do valor de volta.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
};

export default function TrustSection() {
  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Segurança em cada etapa
          </h2>
          <p className="mt-3 text-navy-500">
            Pensado para que aluno e professor confiem na plataforma, não só
            um no outro.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {mockStats.map((stat) => (
            <motion.div
              key={stat.title}
              variants={item}
              className="rounded-2xl border border-navy-900/8 bg-white p-7"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-confirm-500/10">
                <stat.icon className="h-5 w-5 text-confirm-600" />
              </div>
              <h3 className="mt-5 font-semibold text-navy-900">
                {stat.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
