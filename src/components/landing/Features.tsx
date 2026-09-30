"use client";

import { motion } from "framer-motion";
import { PlayCircle, DollarSign, Users, MonitorSmartphone, TrendingUp, RefreshCw } from "lucide-react";

const features = [
  {
    icon: <PlayCircle className="w-6 h-6 text-[#00ff66]" />,
    title: "Aulas práticas",
    desc: "Conteúdos em vídeo para aprender na prática como criar e vender sites.",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-[#00ff66]" />,
    title: "Métodos de monetização",
    desc: "Descubra diferentes formas de transformar sites em uma fonte de renda.",
  },
  {
    icon: <Users className="w-6 h-6 text-[#00ff66]" />,
    title: "Como encontrar clientes",
    desc: "Aprenda estratégias para encontrar empresas e pessoas que precisam de sites.",
  },
  {
    icon: <MonitorSmartphone className="w-6 h-6 text-[#00ff66]" />,
    title: "Criação de sites",
    desc: "Aprenda conceitos e estratégias para criar projetos que podem ser vendidos.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-[#00ff66]" />,
    title: "Estratégias de venda",
    desc: "Entenda como apresentar, precificar e vender seus projetos.",
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-[#00ff66]" />,
    title: "Conteúdo atualizado",
    desc: "Novos conteúdos e atualizações adicionados ao longo do tempo.",
  },
];

export function Features() {
  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Tudo o que você precisa para começar.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-8 rounded-2xl group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-[#00ff66]/10 group-hover:border-[#00ff66]/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
