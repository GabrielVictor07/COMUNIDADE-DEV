import Link from "next/link";
import { PlayCircle, Bell, Play, Calendar } from "lucide-react";
import Card from "@/components/Card";
import { getSettings } from "@/server/settings";
import { getAnnouncements } from "@/server/announcements";
import { getLastWatchedLesson } from "@/server/progress";

interface DashboardWidgetsProps {
  userId: string;
}

export default async function DashboardWidgets({ userId }: DashboardWidgetsProps) {
  const announcements = await getAnnouncements();
  const lastWatched = await getLastWatchedLesson(userId);
  const settings = await getSettings();

  return (
    <aside className="desktop-only w-[300px] flex-shrink-0 flex flex-col gap-5 pt-4 pr-4 pl-2 pb-6 overflow-y-auto sticky top-0 self-start max-h-screen border-l border-white/5">
      
      {/* Widget 1: Continue Assistindo */}
      {lastWatched ? (
        <Link href={`/aulas/${lastWatched.lesson_id}`}>
          <Card className="flex flex-col relative overflow-hidden group hover:border-purple-500/50 transition-colors">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Play className="w-4 h-4 text-purple-400" />
              Continue Assistindo
            </h3>
            <div className="flex gap-4 items-center">
              <div className="w-20 h-14 rounded-lg overflow-hidden relative flex-shrink-0 border border-white/10">
                <img src={lastWatched.lesson.cover_url || "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070"} className="w-full h-full object-cover" alt="Thumb" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle className="w-5 h-5 text-white opacity-80" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-white text-sm font-semibold line-clamp-1">{lastWatched.lesson.title}</h4>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-2 mt-0.5">Em progresso</p>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div className="bg-purple-500 h-1 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" style={{ width: `${lastWatched.progress}%` }}></div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ) : (
        <Card className="flex flex-col relative overflow-hidden">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2">
            <Play className="w-4 h-4 text-purple-400" />
            Continue Assistindo
          </h3>
          <p className="text-white/50 text-sm">Você ainda não iniciou nenhuma aula.</p>
        </Card>
      )}

      {/* Widget 2: Mural de Avisos */}
      <Card className="flex flex-col relative overflow-hidden">
        <h3 className="text-white font-bold mb-5 flex items-center gap-2">
          <Bell className="w-4 h-4 text-purple-400" />
          Mural de Avisos
        </h3>
        <div className="flex flex-col gap-5">
          {announcements.length === 0 ? (
            <p className="text-white/40 text-sm text-center py-4">Nenhum aviso no momento.</p>
          ) : (
            announcements.slice(0, 3).map((aviso, index) => (
              <div key={aviso.id} className="flex gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  index === 0 ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" : 
                  index === 1 ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" : 
                  "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                }`}></div>
                <div>
                  <p className="text-white text-sm font-medium leading-tight">{aviso.title}</p>
                  <p className="text-white/50 text-xs mt-1">{aviso.content}</p>
                  <div className="flex items-center gap-1 mt-2 text-white/30 text-[10px] font-medium">
                    <Calendar className="w-3 h-3" />
                    {new Date(aviso.created_at).toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Widget 3: TikTok */}
      <Card className="flex flex-col relative overflow-hidden group border-white/10 bg-gradient-to-br from-black to-[#111111] hover:border-[#00f2fe]/40 transition-all cursor-pointer">
        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
          <svg viewBox="0 0 448 512" className="w-32 h-32 text-white" fill="currentColor">
            <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
          </svg>
        </div>
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <svg viewBox="0 0 448 512" className="w-4 h-4 text-white drop-shadow-[2px_2px_0px_#fe2c55] drop-shadow-[-2px_-2px_0px_#25f4ee]" fill="currentColor">
            <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
          </svg>
          Acompanhe no TikTok
        </h3>
        <div className="relative z-10 flex flex-col gap-3">
          <p className="text-white/70 text-sm leading-relaxed">
            Fique por dentro das sacadas diárias e de muito conteúdo prático para decolar a sua carreira!
          </p>
          <a href={settings.tiktokUrl || "#"} target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-2 px-4 py-2.5 mt-2 bg-white text-black hover:bg-gray-200 text-sm font-bold rounded-lg transition-all shadow-[4px_4px_0px_#fe2c55,-4px_-4px_0px_#25f4ee] hover:shadow-[2px_2px_0px_#fe2c55,-2px_-2px_0px_#25f4ee]">
            Seguir Perfil
          </a>
        </div>
      </Card>

    </aside>
  );
}
