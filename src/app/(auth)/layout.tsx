export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden selection:bg-purple-500/30 p-4">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Texture Layer */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none z-0 mix-blend-overlay"></div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full flex justify-center py-12 animate-in fade-in zoom-in-95 duration-700">
        {children}
      </div>
    </div>
  );
}
