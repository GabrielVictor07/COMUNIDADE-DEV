"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "ENTRE NA PLATAFORMA",
    desc: "Faça seu acesso e entre na área de membros.",
  },
  {
    num: "02",
    title: "APRENDA",
    desc: "Assista às aulas e coloque os métodos em prática.",
  },
  {
    num: "03",
    title: "APLIQUE",
    desc: "Use o conhecimento para criar, oferecer e vender seus próprios sites.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-zinc-950 border-y border-white/5">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Você não precisa esperar saber tudo para começar.
            </h2>
            <p className="text-zinc-400 text-lg">
              Um processo passo a passo projetado para acelerar sua jornada, focando no que realmente importa.
            </p>
          </motion.div>

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 text-[#00ff66] font-mono text-xl font-bold mt-1">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-wide mb-2 uppercase text-white/90">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
