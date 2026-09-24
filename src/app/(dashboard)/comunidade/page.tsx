"use client";

import { MessageSquare, ExternalLink } from "lucide-react";

export default function ComunidadePage() {
  return (
    <div className="max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2AABEE] to-[#229ED9] flex items-center justify-center shadow-[0_0_15px_rgba(42,171,238,0.4)] shrink-0">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Comunidade VIP</h1>
          <p className="text-white/60 text-sm mt-1">Conecte-se com outros alunos no nosso grupo exclusivo do Telegram.</p>
        </div>
      </div>

      <div className="bg-black/20 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto mt-8 sm:mt-16">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#2AABEE]/20 flex items-center justify-center mb-6 shrink-0">
          <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-[#2AABEE]" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Grupo do Telegram</h2>
        <p className="text-white/60 mb-6 sm:mb-8 max-w-md text-sm sm:text-base leading-relaxed">
          Nossa comunidade acontece no Telegram! Lá você pode tirar dúvidas, fazer networking e interagir diretamente com os professores e outros alunos.
        </p>
        <a 
          href="https://t.me/seu_link_aqui" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-[#2AABEE] hover:bg-[#229ED9] text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(42,171,238,0.3)] hover:shadow-[0_0_30px_rgba(42,171,238,0.5)] hover:scale-105"
        >
          <ExternalLink className="w-5 h-5 shrink-0" />
          Acessar Grupo do Telegram
        </a>
      </div>
    </div>
  );
}
