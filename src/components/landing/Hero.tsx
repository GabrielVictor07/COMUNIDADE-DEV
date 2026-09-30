"use client";

import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-[#00ff66]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="badge-premium"
        >
          <Flame className="w-4 h-4 text-[#00ff66]" />
          <span>Lote Inicial — Primeiros 500 acessos</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] max-w-4xl mx-auto mb-6 text-glow"
        >
          Aprenda a ganhar dinheiro <br className="hidden md:block" />
          <span className="text-white/80">criando e vendendo sites.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Tenha acesso a uma plataforma prática com aulas, métodos e estratégias para transformar a criação de sites em uma fonte de renda previsível.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 w-full sm:w-auto"
        >
          <button className="button-neon group flex items-center justify-center gap-3 w-full sm:w-auto text-lg">
            QUERO ACESSAR POR R$ 29,90
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-zinc-500 font-medium">
            <span className="flex items-center gap-1">Pagamento único</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">Acesso vitalício</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">Atualizações incluídas</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 p-6 rounded-2xl glass-card max-w-md w-full"
        >
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-semibold text-[#00ff66] flex items-center gap-2">
              <Flame className="w-4 h-4" /> 500 acessos no lote inicial
            </span>
            <span className="text-xs text-zinc-500 font-mono">142 / 500</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden mb-3">
            <div className="bg-[#00ff66] h-full rounded-full shadow-[0_0_10px_#00ff66]" style={{ width: '28.4%' }} />
          </div>
          <p className="text-xs text-zinc-400 text-left">
            Quando o lote de 500 acessos acabar, o preço passa para R$ 69,90.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
