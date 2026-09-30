"use client";

import { motion } from "framer-motion";
import { Check, Shield, Zap, Infinity, RefreshCw, Flame } from "lucide-react";

const benefits = [
  "Acesso à plataforma",
  "Vídeos e aulas práticas",
  "Métodos para ganhar dinheiro com sites",
  "Estratégias para encontrar clientes",
  "Estratégias para vender sites",
  "Novos conteúdos",
  "Atualizações contínuas",
  "Acesso vitalício",
  "Pagamento único",
];

export function Pricing() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background glow behind pricing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[#00ff66]/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Benefits Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
            Seu acesso inclui:
          </h2>
          <ul className="space-y-4">
            {benefits.map((benefit, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 text-zinc-300"
              >
                <div className="w-6 h-6 rounded-full bg-[#00ff66]/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#00ff66]" />
                </div>
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Pricing Card Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-card rounded-3xl p-8 md:p-10 border-[#00ff66]/20 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="badge-premium mb-0 bg-[#050505] shadow-[0_0_20px_rgba(0,255,102,0.2)]">
                <Flame className="w-3.5 h-3.5" /> OFERTA DO LOTE INICIAL
              </span>
            </div>

            <div className="text-center mt-6 mb-8">
              <h3 className="text-2xl font-bold mb-4">Entre agora por apenas</h3>
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-zinc-500 line-through text-lg">R$ 69,90</span>
                <span className="text-sm font-semibold text-[#00ff66] bg-[#00ff66]/10 px-2 py-1 rounded">
                  500 primeiros acessos
                </span>
              </div>
              <div className="text-6xl md:text-7xl font-bold tracking-tighter text-white text-glow mb-4">
                R$ 29<span className="text-4xl">,90</span>
              </div>
              <p className="text-sm text-zinc-400">Pagamento único. Sem mensalidade.</p>
            </div>

            <button className="button-neon w-full flex items-center justify-center gap-2 mb-8 text-lg font-bold">
              QUERO MEU ACESSO
            </button>

            <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs font-medium text-zinc-400">
              <div className="flex items-center justify-center gap-1.5">
                <Shield className="w-4 h-4 text-[#00ff66]" /> Pagamento seguro
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Zap className="w-4 h-4 text-[#00ff66]" /> Acesso imediato
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Infinity className="w-4 h-4 text-[#00ff66]" /> Acesso vitalício
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-[#00ff66]" /> Atualizações
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-xs text-zinc-500">
                Após os 500 primeiros acessos, o valor será atualizado para R$ 69,90.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
