import { getAdminStats } from "@/server/admin";
import Card from "@/components/Card";
import {
  Users,
  UserCheck,
  Clock,
  PlayCircle,
  FileText,
  CreditCard,
  CheckCircle,
} from "lucide-react";

export default async function AdminPage() {
  const stats = await getAdminStats();

  const items = [
    { label: "Total Usuários", value: stats.totalUsers, icon: Users },
    { label: "Usuários Ativos", value: stats.activeUsers, icon: UserCheck },
    { label: "Usuários Pendentes", value: stats.pendingUsers, icon: Clock },
    { label: "Total Aulas", value: stats.totalLessons, icon: PlayCircle },
    { label: "Total E-books", value: stats.totalEbooks, icon: FileText },
    { label: "Total Compras", value: stats.totalPurchases, icon: CreditCard },
    { label: "Compras Pagas", value: stats.paidPurchases, icon: CheckCircle },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Painel Administrativo</h1>
          <p className="text-sm text-rose-300">Acompanhe as métricas e gerencie a plataforma.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card key={item.label} className="p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-900/15 via-rose-900/5 to-transparent pointer-events-none"></div>
            <div className="bg-gradient-to-br from-rose-500/20 to-red-600/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-rose-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-all">
              <item.icon className="w-6 h-6 text-rose-400 group-hover:text-rose-300 transition-colors" />
            </div>
            <p className="text-3xl font-bold text-white mb-1 tracking-tight">{item.value}</p>
            <p className="text-sm text-gray-400 font-medium">{item.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
