import { getCurrentUser } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { getSettings } from "@/server/settings";
import Button from "@/components/Button";
import LogoutButton from "@/components/LogoutButton";
import { LogOut, Lock, CheckCircle2 } from "lucide-react";
import Input from "@/components/Input";

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const resolvedParams = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  // Se já tem acesso, manda pro dashboard
  if (user.access_status === "ACTIVE") redirect("/dashboard");
  if (user.role === "ADMIN") redirect("/dashboard");

  const settings = await getSettings();

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Exibir erro se houver */}
      {resolvedParams.error === "internal" && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-3 rounded-lg flex items-center gap-3">
          <span>⚠️ <strong>Erro:</strong> Falha ao gerar cobrança. Tente novamente em instantes.</span>
        </div>
      )}
      
      {/* Header simples */}
      <header className="w-full p-6 flex justify-between items-center z-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="font-extrabold text-xl text-white tracking-tight">
            {settings.platformName}
          </span>
        </div>
        
        <LogoutButton />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Lado Esquerdo: Copy e Benefícios */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-purple-400 text-sm font-medium mb-6">
                <Lock className="w-4 h-4" />
                Acesso Restrito
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Desbloqueie seu acesso vitalício à plataforma
              </h1>
              <p className="text-lg text-white/60">
                Sua conta foi criada, mas você precisa adquirir o acesso para liberar todas as aulas, e-books e a comunidade exclusiva.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "Acesso vitalício a todo o conteúdo atual",
                "Atualizações futuras sem custo adicional",
                "Comunidade exclusiva para networking",
                "E-books e materiais de apoio",
              ].map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0" />
                  <span className="text-white/80">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lado Direito: Card de Pagamento */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">Acesso Completo</h2>
              <p className="text-white/60 mb-6">Pagamento único. Sem mensalidades.</p>
              
              <div className="flex items-end gap-2 mb-8">
                <span className="text-xl text-white/40 font-medium line-through mb-1">R$ 67,90</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl text-green-400 font-medium">R$</span>
                  <span className="text-5xl font-black text-green-400 tracking-tight">29<span className="text-2xl text-green-400 font-medium">,90</span></span>
                </div>
              </div>

              {/* Server Action to initiate checkout */}
              <form action={async () => {
                "use server";
                redirect(`/api/checkout`);
              }} className="space-y-4">
                
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] hover:-translate-y-1"
                >
                  Garantir Meu Acesso
                </button>
              </form>

              <div className="mt-6 text-center flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span className="text-white/40 text-xs">Pagamento 100% seguro via Asaas</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
