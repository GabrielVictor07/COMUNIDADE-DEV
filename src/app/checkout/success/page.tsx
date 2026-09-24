import Link from "next/link";
import { CheckCircle2, PlayCircle } from "lucide-react";
import { getCurrentUser } from "@/lib/permissions";
import DashboardButton from "./DashboardButton";
export default async function CheckoutSuccessPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-green-500/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-lg w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Pagamento Confirmado!
        </h1>
        
        <p className="text-white/70 text-lg mb-8">
          Seja bem-vindo(a) à Comunidade Dev! {user ? `${user.name || ''}, seu` : "Seu"} acesso vitalício foi liberado com sucesso.
        </p>

        <div className="space-y-4">
          <DashboardButton />
          <p className="text-white/40 text-sm">
            Um e-mail com os detalhes da compra foi enviado para você.
          </p>
        </div>
      </div>
    </div>
  );
}
