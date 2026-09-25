"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PlayCircle, Search, Filter } from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  category: string | null;
  cover_url: string | null;
  video_url: string;
};

function getYouTubeThumbnail(url: string) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^"&?\/\s]{11})/);
  return match && match[1] ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
}

export default function AulasClient({ initialLessons }: { initialLessons: Lesson[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const cats = new Set<string>();
    initialLessons.forEach(l => {
      if (l.category) cats.add(l.category);
    });
    return Array.from(cats).sort();
  }, [initialLessons]);

  const filteredLessons = useMemo(() => {
    return initialLessons.filter(lesson => {
      const matchSearch = lesson.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "all" || lesson.category === category;
      return matchSearch && matchCat;
    });
  }, [initialLessons, search, category]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-start mb-8 gap-6">
        <h1 className="text-3xl font-bold text-white">Catálogo de Aulas</h1>
        
        <div className="flex flex-row items-center gap-3 w-full max-w-2xl">
          <div className="relative flex-1 sm:flex-none">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-white/40" />
            </div>
            <input 
              type="text"
              placeholder="Buscar aula..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-80 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm"
            />
          </div>

          <div className="relative flex-1 sm:flex-none">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="w-4 h-4 text-white/40" />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-56 appearance-none bg-white/5 border border-white/10 rounded-xl pl-10 pr-8 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm [&>option]:bg-gray-900 cursor-pointer"
            >
              <option value="all">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      {filteredLessons.length === 0 ? (
        <div className="text-center py-20 bg-black/20 backdrop-blur-xl border border-white/5 rounded-2xl">
          <p className="text-gray-400 text-lg">
            {initialLessons.length === 0 ? "Nenhuma aula disponível no momento." : "Nenhuma aula encontrada para sua busca."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLessons.map((lesson) => (
            <Link href={`/aulas/${lesson.id}`} key={lesson.id} className="group block">
              <div className="rounded-2xl p-0 overflow-hidden flex flex-col h-[340px] relative bg-black hover:border-purple-500/30 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all border border-white/5">
                
                {/* Background Image that fills the card */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  {(lesson.cover_url || getYouTubeThumbnail(lesson.video_url)) ? (
                    <img 
                      src={lesson.cover_url || getYouTubeThumbnail(lesson.video_url)!} 
                      alt={lesson.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-purple-900 to-black w-full h-full flex items-center justify-center opacity-60 group-hover:opacity-80 transition-all duration-700">
                      <PlayCircle className="w-16 h-16 text-white/10" />
                    </div>
                  )}
                </div>

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0716] via-[#0b0716]/60 to-transparent opacity-90 pointer-events-none"></div>

                {/* Content Container (Bottom Aligned) */}
                <div className="relative z-10 p-4 flex flex-col justify-end mt-auto h-full">
                  {lesson.category && (
                    <span className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1 drop-shadow-md">
                      {lesson.category}
                    </span>
                  )}
                  <h4 className="text-white font-bold text-lg leading-tight mb-4 line-clamp-2 drop-shadow-md">
                    {lesson.title}
                  </h4>
                  
                  {/* Button Ver Aula */}
                  <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-purple-600 text-white text-sm font-medium rounded-xl transition-all border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    <PlayCircle className="w-4 h-4" />
                    Ver aula
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
