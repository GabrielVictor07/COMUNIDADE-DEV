import { requireAuth } from "@/lib/permissions";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { getSettings } from "@/server/settings";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();
  const settings = await getSettings();

  if (settings.is_maintenance && user.role !== "ADMIN") {
    redirect("/manutencao");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar userName={user.name || "Aluno"} />
      
      <div className="flex-1 flex flex-col min-w-0 w-full relative">
        <Header />
        
        {/* Área de conteúdo */}
        <main className="flex-1 overflow-x-hidden pt-4 px-4 md:px-8 min-w-0">
          <div className="w-full pb-24 md:pb-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
