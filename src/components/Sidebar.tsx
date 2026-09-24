"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlayCircle, BookOpen, Users, User, LogOut } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/aulas", label: "Aulas", icon: PlayCircle },
  { href: "/ebooks", label: "E-books", icon: BookOpen },
  { href: "/comunidade", label: "Comunidade", icon: Users },
];

interface SidebarProps {
  userName?: string;
}

export default function Sidebar({ userName }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    // Para manter compatibilidade com o layout client-side, fazemos signOut direto
    // Passando redirect: false ignoramos a página de confirmação do next-auth
    const { signOut } = await import("next-auth/react");
    await signOut({ redirect: false });
    window.location.href = "/login";
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="desktop-only flex flex-col w-64 h-screen sticky top-0 bg-black/20 backdrop-blur-3xl border-r border-white/5 p-5 flex-shrink-0 z-40 overflow-y-auto">
        {/* Gradiente roxo suave no fundo da sidebar */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/15 via-purple-900/5 to-transparent pointer-events-none -z-10"></div>
        
        <div className="mb-10 mt-2 px-2">
          <Logo className="h-8" />
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            const Icon = link.icon;


            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-white/10 text-white shadow-[inset_1px_1px_3px_rgba(255,255,255,0.1),0_0_20px_rgba(168,85,247,0.2)]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-purple-300" : ""}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        {userName && (
          <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/10">
            <Link href="/perfil" className="flex items-center gap-3 hover:opacity-80 transition group overflow-hidden">
              <div className="bg-gradient-to-tr from-purple-600 to-blue-500 w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]">
              </div>
              <span className="text-white/90 text-sm font-medium truncate max-w-[100px]">{userName}</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="text-white/50 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-xl transition-all"
              title="Sair da conta"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {/* Mobile Bottom Navigation (Floating Glass Pill) */}
      <nav className="mobile-only fixed bottom-6 left-4 right-4 z-50 bg-black/40 backdrop-blur-2xl border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-2xl p-2 flex items-center justify-around">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(link.href + "/");
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                active
                  ? "text-purple-400 bg-white/10"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
