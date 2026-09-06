"use client";

import { motion } from "framer-motion";
import { Search, ShieldCheck, Video } from "lucide-react";
import TiltCard from "./TiltCard";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
};

export default function HowItWorks({ dict }: { dict: Dictionary["landing"] }) {
  const steps = [
    { number: "1", icon: Search, title: dict.step1Title, description: dict.step1Description },
    { number: "2", icon: ShieldCheck, title: dict.step2Title, description: dict.step2Description },
    { number: "3", icon: Video, title: dict.step3Title, description: dict.step3Description },
  ];

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
            {dict.howItWorksTitle}
          </h2>
          <p className="mt-3 text-navy-500">{dict.howItWorksSubtitle}</p>
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
