import { getCurrentUser } from "@/lib/permissions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlayCircle, BookOpen } from "lucide-react";
import Card from "@/components/Card";
import { getFeaturedLessons, getLaunchHero, getFeaturedHero } from "@/server/lessons";
import DashboardWidgets from "@/components/DashboardWidgets";

function getYouTubeThumbnail(url: string) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^"&?\/\s]{11})/);
  return match && match[1] ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

function getValidCoverUrl(lesson: any) {
  if (lesson.cover_url && !lesson.cover_url.startsWith("/uploads/")) {
    return lesson.cover_url;
  }
  return getYouTubeThumbnail(lesson.video_url);
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const resolvedParams = await searchParams;
  const error = resolvedParams.error;
  const user = await getCurrentUser();
  if (!user) redirect("/api/auth/logout");

  // Buscar aulas em destaque
  const featuredLessons = await getFeaturedLessons(4);
  const heroLaunch = await getLaunchHero();
  const heroFeatured = await getFeaturedHero();

  return (
    <div className="flex gap-6 w-full">
      <div className="flex-1 w-full min-w-0">
      
      {error === "access_denied" && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg px-4 py-3 mb-6 flex items-center gap-3">
          <p className="text-red-400 text-sm">
            <strong>Acesso restrito:</strong> Sua conta ainda não possui acesso ativo a este conteúdo.
          </p>
        </div>
      )}

      {/* Hero Cards */}
      {heroLaunch || heroFeatured ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {heroLaunch && (
            <Card className="flex flex-col justify-between min-h-[200px] relative overflow-hidden group p-6 border-white/10 bg-gradient-to-br from-purple-600/20 via-black/20 to-transparent">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full border border-purple-500/20 mb-3 drop-shadow-md">
                  Lançamento
                </span>
                <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">{heroLaunch.title}</h2>
                <p className="text-white/80 max-w-sm text-sm drop-shadow-md line-clamp-2">
                  {heroLaunch.category || "Assista agora a nossa aula de lançamento."}
                </p>
              </div>
              <div className="relative z-10 mt-6">
                <Link href={`/aulas/${heroLaunch.id}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full transition-all border border-white/10 shadow-lg">
                  <PlayCircle className="w-4 h-4" />
                  Começar agora
                </Link>
              </div>
            </Card>
          )}

          {heroFeatured && (
            <Card className="flex flex-col justify-between min-h-[200px] relative overflow-hidden group p-6 border-white/10 bg-gradient-to-br from-blue-600/20 via-black/20 to-transparent">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/20 mb-3 drop-shadow-md">
                  Destaque
                </span>
                <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">{heroFeatured.title}</h2>
                <p className="text-white/80 max-w-sm text-sm drop-shadow-md line-clamp-2">
                  {heroFeatured.category || "Assista agora a nossa aula em destaque."}
                </p>
              </div>
              <div className="relative z-10 mt-6">
                <Link href={`/aulas/${heroFeatured.id}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full transition-all border border-white/10 shadow-lg">
                  <PlayCircle className="w-4 h-4" />
                  Acessar agora
                </Link>
              </div>
            </Card>
          )}
        </div>
      ) : (
        <Card className="flex items-center justify-center min-h-[150px] mb-8 bg-black/20 backdrop-blur-3xl border-white/10 p-6">
          <p className="text-white/50 text-sm">Nenhum lançamento ou destaque configurado no momento.</p>
        </Card>
      )}
      
      {/* Aulas em Destaque */}
      <div className="flex items-center justify-between mb-4 mt-8">
        <h3 className="text-xl font-bold text-white">Aulas em Destaque</h3>
        <Link href="/aulas" className="text-purple-400 text-sm hover:text-purple-300 transition">Ver todas</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredLessons.length === 0 ? (
          <div className="col-span-full">
            <Card className="flex items-center justify-center min-h-[150px] bg-black/20 backdrop-blur-3xl border-white/10 p-6">
              <p className="text-white/50 text-sm">Nenhuma aula em destaque configurada no momento.</p>
            </Card>
          </div>
        ) : (
          featuredLessons.map((lesson) => (
            <Link href={`/aulas/${lesson.id}`} key={lesson.id} className="group">
              <div className="rounded-2xl p-0 overflow-hidden flex flex-col h-[340px] relative bg-black hover:border-purple-500/30 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all border border-white/5">
                
                {/* Background Image that fills the card */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img 
                    src={getValidCoverUrl(lesson) || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop"} 
                    alt={lesson.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0716] via-[#0b0716]/60 to-transparent opacity-90 pointer-events-none"></div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-semibold text-white border border-white/10 z-10">
                  Aula Oficial
                </div>

                {/* Content Container (Bottom Aligned) */}
                <div className="relative z-10 p-4 flex flex-col justify-end mt-auto">
                  <span className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1 drop-shadow-md">
                    Publicada em {new Date(lesson.created_at).toLocaleDateString("pt-BR")}
                  </span>
                  <h4 className="text-white font-bold text-lg leading-tight mb-4 line-clamp-2 drop-shadow-md">{lesson.title}</h4>
                  
                  {/* Button Ver Aula */}
                  <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-purple-600 text-white text-sm font-medium rounded-xl transition-all border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    <PlayCircle className="w-4 h-4" />
                    Ver aula
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
    <DashboardWidgets userId={user.id} />
  </div>
  );
}
