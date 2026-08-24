"use client";

import { motion } from "framer-motion";
import { Search, ShieldCheck, Video } from "lucide-react";
import TiltCard from "./TiltCard";

// MOCK — conteúdo estático por enquanto, sem dependência de backend
const steps = [
  {
    number: "1",
    icon: Search,
    title: "Busque a matéria",
    description:
      "Digite a disciplina — Química, Matemática, História — e veja professores disponíveis com nota e preço por hora.",
  },
  {
    number: "2",
    icon: ShieldCheck,
    title: "Agende e pague seguro",
    description:
      "O valor fica retido na plataforma (escrow) e só é liberado ao professor depois que a aula acontece.",
  },
  {
    number: "3",
    icon: Video,
    title: "Aprenda na sala de vídeo",
    description:
      "Entre na videochamada integrada, sem precisar instalar nada ou sair do site.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
};

export default function HowItWorks() {
  return (
    <section className="bg-navy-50/40 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Como funciona
          </h2>
          <p className="mt-3 text-navy-500">
            Da dúvida à aula, em três passos — sem burocracia.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.div key={step.number} variants={item}>
              <TiltCard className="h-full p-7">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-navy-100">
                    {step.number}
                  </span>
                  <step.icon className="h-6 w-6 text-navy-500" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-navy-500">
                  {step.description}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
