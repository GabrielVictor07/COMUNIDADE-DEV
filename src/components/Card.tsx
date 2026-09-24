import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`relative bg-black/20 backdrop-blur-3xl rounded-2xl border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-6 overflow-hidden ${className}`}>
      {/* Gradiente roxo suave no fundo do card */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent pointer-events-none -z-10"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
