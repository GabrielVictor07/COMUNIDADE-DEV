export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10 bg-[#050505]">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500 text-sm">
        <div className="font-bold text-white tracking-wide">
          Site Money
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Suporte</a>
        </div>

        <div className="text-center md:text-right max-w-xs text-xs opacity-60">
          Resultados podem variar de acordo com a aplicação das estratégias, experiência e dedicação de cada pessoa.
        </div>
      </div>
    </footer>
  );
}
