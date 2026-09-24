"use client";

import { Wrench } from "lucide-react";
import Image from "next/image";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center max-w-lg w-full">
        {/* Ícone Wrench visual */}
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-rose-500/20 blur-2xl rounded-full" />
          <div className="relative bg-black/40 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
            <Wrench className="w-24 h-24 text-rose-500 animate-pulse" />
          </div>
        </div>

        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-6 tracking-tight">
          Voltamos em breve
        </h1>
        
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Nossa plataforma está passando por manutenções e melhorias no momento. Estamos trabalhando para trazer uma experiência ainda melhor para você.
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
            Status do Sistema
          </p>
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </div>
            <span className="text-orange-400 font-medium">Em manutenção</span>
          </div>
        </div>
      </div>
    </div>
  );
}
