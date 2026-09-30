"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-32 px-6 relative border-t border-white/5 bg-zinc-950 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#00ff66]/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-glow">
            Comece antes que o lote inicial termine.
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            Entre para a plataforma por R$ 29,90 e tenha acesso vitalício aos conteúdos e futuras atualizações.
          </p>

          <div className="mb-10">
            <div className="text-5xl font-bold tracking-tight mb-2 text-white">R$ 29,90</div>
            <div className="text-[#00ff66] font-medium">Primeiros 500 acessos</div>
          </div>

          <Link href="/cadastro" className="button-neon group inline-flex items-center justify-center gap-3 text-lg px-12 mx-auto">
            QUERO ACESSAR AGORA
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="mt-8 text-sm text-zinc-500 font-medium flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            <span>Pagamento único</span>
            <span className="hidden sm:inline">•</span>
            <span>Acesso vitalício</span>
            <span className="hidden sm:inline">•</span>
            <span>Atualizações incluídas</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
