import { requireActiveAccess } from "@/lib/permissions";
import { getEbooks } from "@/server/ebooks";
import { Download, ExternalLink, BookOpen } from "lucide-react";

export default async function EbooksPage() {
  await requireActiveAccess();
  const ebooks = await getEbooks();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold text-white mb-8">E-books e Materiais</h1>
      {ebooks.length === 0 ? (
        <div className="text-center py-20 bg-black/20 backdrop-blur-xl border border-white/5 rounded-2xl">
          <p className="text-gray-400 text-lg">
            Nenhum e-book disponível no momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ebooks.map((ebook) => (
            <div key={ebook.id} className="group block">
              <div className="rounded-2xl p-0 overflow-hidden flex flex-col h-[380px] relative bg-black hover:border-emerald-500/30 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all border border-white/5">
                
                {/* Background Image that fills the card */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  {ebook.cover_url ? (
                    <img 
                      src={ebook.cover_url} 
                      alt={ebook.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-emerald-900 to-black w-full h-full flex items-center justify-center opacity-60 group-hover:opacity-80 transition-all duration-700">
                      <BookOpen className="w-16 h-16 text-white/10" />
                    </div>
                  )}
                </div>

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0716] via-[#0b0716]/80 to-transparent opacity-90 pointer-events-none"></div>

                {/* Content Container (Bottom Aligned) */}
                <div className="relative z-10 p-4 flex flex-col justify-end mt-auto h-full">
                  {ebook.category && (
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 drop-shadow-md">
                      {ebook.category}
                    </span>
                  )}
                  <h4 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-2 drop-shadow-md">
                    {ebook.title}
                  </h4>
                  <p className="text-gray-300 text-sm mb-5 line-clamp-2 drop-shadow-md">
                    {ebook.description}
                  </p>
                  
                  {/* Buttons */}
                  <div className="w-full flex items-center gap-2 mt-auto">
                    {ebook.file_url ? (
                      <>
                        <a
                          href={ebook.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-emerald-600 text-white text-sm font-medium rounded-xl transition-all border border-white/10 shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Ler E-book
                        </a>
                        <a
                          href={ebook.file_url}
                          download
                          className="flex items-center justify-center px-4 py-2 bg-white/5 hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-all border border-white/10"
                          title="Baixar PDF"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </>
                    ) : (
                      <div className="w-full text-center py-2 bg-white/5 text-gray-400 text-sm font-medium rounded-xl border border-white/5">
                        Indisponível
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
