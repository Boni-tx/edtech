"use client";

import { motion } from "framer-motion";
import { Lock, Users, Flag } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
};

export default function TrustSection({ dict }: { dict: Dictionary["landing"] }) {
  const mockStats = [
    { icon: Lock, title: dict.trustPaymentTitle, description: dict.trustPaymentDescription },
    { icon: Users, title: dict.trustReviewsTitle, description: dict.trustReviewsDescription },
    { icon: Flag, title: dict.trustRefundTitle, description: dict.trustRefundDescription },
  ];

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
            {dict.trustTitle}
          </h2>
          <p className="mt-3 text-navy-500">{dict.trustSubtitle}</p>
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
