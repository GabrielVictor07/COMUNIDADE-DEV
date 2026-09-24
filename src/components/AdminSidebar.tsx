"use client";

import { Shield, LayoutDashboard, Users, BookOpen, FileText, Settings, LogOut, PlayCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { destroySession } from "@/lib/auth";
import Logo from "./Logo";

const links = [
  { href: "/admin", label: "Visão Geral", icon: LayoutDashboard, exact: true },
  { href: "/admin/avisos", label: "Mural de Avisos", icon: BookOpen },
  { href: "/admin/usuarios", label: "Usuários", icon: Users },
  { href: "/admin/aulas", label: "Aulas (Vídeos)", icon: PlayCircle },
  { href: "/admin/ebooks", label: "E-books", icon: FileText },
  { href: "/admin/settings", label: "Configurações", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <aside className="desktop-only flex flex-col w-64 h-screen bg-black/40 backdrop-blur-3xl border-r border-rose-500/10 p-5 flex-shrink-0 z-40 overflow-y-auto relative">
        {/* Glowing Red/Rose background effect for Admin */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-900/15 via-rose-900/5 to-transparent pointer-events-none -z-10"></div>
        
        <div className="mb-10 mt-2 px-2 flex flex-col gap-2">
          <Logo className="h-7" />
          <div>
            <p className="text-rose-400 text-[10px] uppercase font-bold tracking-wider pl-1">Painel Admin</p>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2 relative z-10">
          {links.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  active
                    ? "text-white bg-rose-500/10 border border-rose-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-rose-400" : ""}`} />
                <span className={`font-medium text-sm ${active ? "drop-shadow-md" : ""}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-10">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-transparent">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Visão do Aluno</span>
          </Link>
          <button 
            onClick={async () => {
              const { signOut } = await import("next-auth/react");
              await signOut({ redirect: false });
              window.location.href = "/login";
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all mt-2 border border-transparent"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation for Admin */}
      <nav className="mobile-only fixed bottom-6 left-4 right-4 z-50 bg-black/40 backdrop-blur-2xl border border-rose-500/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-2xl p-2 flex items-center justify-around overflow-x-auto gap-2 scrollbar-hide">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all flex-shrink-0 min-w-[4rem] ${
                active
                  ? "text-rose-400 bg-rose-500/10"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium truncate max-w-full">{label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
