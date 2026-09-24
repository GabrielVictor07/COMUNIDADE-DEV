import { requireAdmin } from "@/lib/permissions";
import AdminSidebar from "@/components/AdminSidebar";
import { Shield } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();
  const userName = user.name || "Admin";

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden relative selection:bg-rose-500/30">
      {/* Fundo Global Admin (Tons de vermelho/rosa sutil) */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-rose-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[120px]"></div>
      </div>

      <AdminSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-rose-500/10 bg-black/20 backdrop-blur-3xl px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-2">
            <span className="font-bold text-rose-500 text-lg tracking-tight">Painel VIP</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-300 text-sm font-medium">{userName}</span>
            <div className="bg-gradient-to-br from-rose-500 to-red-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-[0_0_10px_rgba(225,29,72,0.5)]">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
