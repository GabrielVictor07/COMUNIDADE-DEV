"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "O acesso é vitalício?",
    a: "Sim. Após a compra, você mantém o acesso à plataforma.",
  },
  {
    q: "Existe mensalidade?",
    a: "Não. O acesso é adquirido através de um pagamento único.",
  },
  {
    q: "Vou receber novos conteúdos?",
    a: "Sim. Novos conteúdos e atualizações serão adicionados à plataforma ao longo do tempo.",
  },
  {
    q: "Quanto custa?",
    a: "O lote inicial custa R$ 29,90 para os primeiros 500 acessos. Depois, o valor será R$ 69,90.",
  },
  {
    q: "Preciso ser programador?",
    a: "Não necessariamente. O conteúdo é apresentado de forma prática e progressiva, permitindo que iniciantes também acompanhem.",
  },
  {
    q: "É possível ganhar dinheiro com sites?",
    a: "A plataforma apresenta métodos, estratégias e possibilidades de monetização. Os resultados dependem da aplicação, habilidade, dedicação e contexto de cada pessoa.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Perguntas frequentes</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-medium text-lg">{faq.q}</span>
                <ChevronDown
                  className={cn("w-5 h-5 text-zinc-400 transition-transform duration-300", {
                    "rotate-180": openIndex === i,
                  })}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-zinc-400"
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
