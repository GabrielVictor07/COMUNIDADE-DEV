export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0b2e] to-[#050505] flex items-center justify-center overflow-hidden selection:bg-purple-500/30 p-4">
      
      {/* Texture Layer */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none z-0 mix-blend-overlay"></div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full flex justify-center py-12 animate-in fade-in zoom-in-95 duration-700">
        {children}
      </div>
    </div>
  );
}
