"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const forWho = [
  "Para quem quer começar a vender sites",
  "Para designers que querem aumentar sua renda",
  "Para desenvolvedores iniciantes",
  "Para freelancers",
  "Para quem quer trabalhar pela internet",
  "Para quem quer criar uma nova fonte de renda",
];

const notForWho = [
  "Está procurando dinheiro fácil sem aprender nada",
  "Não pretende colocar o conhecimento em prática",
  "Procura uma fórmula de dinheiro garantido",
  "Espera resultados sem esforço",
];

export function TargetAudience() {
  return (
    <section className="py-24 px-6 bg-[#050505]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Para quem é */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-8">
              Para quem quer transformar conhecimento em renda.
            </h2>
            <ul className="space-y-4 mb-8">
              {forWho.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00ff66] shrink-0 mt-0.5" />
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-zinc-400 font-medium">
                Você não precisa ser um especialista para começar. O método foi desenhado para iniciantes e intermediários.
              </p>
            </div>
          </motion.div>

          {/* Para quem não é */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:pt-16"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-zinc-400 tracking-tight mb-6">
              Essa plataforma não é para você se...
            </h2>
            <ul className="space-y-4">
              {notForWho.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-500 opacity-80">
                  <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
