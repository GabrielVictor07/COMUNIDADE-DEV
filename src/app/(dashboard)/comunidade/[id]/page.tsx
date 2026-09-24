"use client";

import { useState, useEffect } from "react";
import { getPost, createComment } from "@/server/community";
import { MessageSquare, ArrowLeft, User, Send } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PostPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [commenting, setCommenting] = useState(false);
  const [error, setError] = useState("");

  const loadPost = async () => {
    try {
      const data = await getPost(id);
      setPost(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCommenting(true);
    try {
      await createComment({ postId: id, content });
      setContent("");
      await loadPost();
    } catch (err: any) {
      setError(err.message || "Erro ao comentar");
    } finally {
      setCommenting(false);
    }
  };

  if (loading) {
    return <div className="text-white/50 text-center py-20">Carregando post...</div>;
  }

  if (!post) {
    return <div className="text-white/50 text-center py-20">Post não encontrado.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <Link href="/comunidade" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Voltar para Comunidade
      </Link>

      <div className="bg-black/20 backdrop-blur-3xl border border-white/5 p-8 rounded-3xl shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-xs font-medium text-white/40 mb-8 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
            <User className="w-4 h-4 text-purple-400" />
            <span className="text-white/80">{post.user?.name || "Usuário"}</span>
          </div>
          <span>•</span>
          <span>{new Date(post.created_at).toLocaleString('pt-BR')}</span>
        </div>

        <div className="text-white/80 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
          {post.content}
        </div>
      </div>

      {/* Comentários */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-400" />
          Comentários ({post.comments?.length || 0})
        </h3>

        {/* Lista de Comentários */}
        <div className="space-y-4">
          {post.comments?.map((comment: any) => (
            <div key={comment.id} className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                <div className="flex items-center gap-2 font-medium text-purple-300">
                  <User className="w-3 h-3" />
                  {comment.user?.name || "Usuário"}
                </div>
                <span>{new Date(comment.created_at).toLocaleString('pt-BR')}</span>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))}
        </div>

        {/* Formulário de Comentário */}
        <div className="bg-black/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl mt-8">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium border bg-red-500/10 text-red-400 border-red-500/20">
              {error}
            </div>
          )}
          <form onSubmit={handleCreateComment} className="flex flex-col gap-3">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Escreva seu comentário..."
              required
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={commenting}
                className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                {commenting ? "Enviando..." : (
                  <>
                    <Send className="w-4 h-4" />
                    Comentar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
