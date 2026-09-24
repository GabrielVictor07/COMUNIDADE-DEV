"use client";

import Link from "next/link";
import { ArrowLeft, Ghost } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center max-w-lg w-full">
        {/* Ícone Fantasma ou 404 visual */}
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-rose-500/20 blur-2xl rounded-full" />
          <div className="relative bg-black/40 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
            <Ghost className="w-24 h-24 text-rose-500 animate-bounce" />
          </div>
        </div>

        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-4 tracking-tight">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          Página não encontrada
        </h2>
        
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Parece que você se perdeu no espaço. A página que você está procurando não existe ou foi movida.
        </p>

        <Link
          href="/dashboard"
          className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}
